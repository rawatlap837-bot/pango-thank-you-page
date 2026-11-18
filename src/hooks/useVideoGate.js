import { useEffect, useRef, useState } from "react";
import { loadProgress, saveProgress } from "../utils/storage";

// How many seconds ahead of the "furthest watched" point the video may jump
// before we treat it as skipping and send the viewer back.
const SKIP_TOLERANCE_SECONDS = 1.5;

// How often (in video seconds) progress is saved while playing.
const SAVE_EVERY_SECONDS = 5;

/**
 * Keeps track of how much of the video has really been watched.
 *
 * - Blocks skipping ahead and speeding the video up
 * - Pauses the video when the tab is hidden
 * - Remembers progress, so a refresh resumes instead of restarting
 * - Tells the page when the video has been finished (isCompleted)
 *
 * Usage:   const gate = useVideoGate({ storageKey, fallbackDuration });
 *          <video {...gate.videoProps} src="..." />
 */
export default function useVideoGate({ storageKey, fallbackDuration }) {
  const videoRef = useRef(null);

  // Read saved progress once, when the page first loads.
  const [saved] = useState(() => loadProgress(storageKey));

  // The furthest second the viewer has genuinely reached. A ref (not state)
  // because we read it inside video events and don't need a re-render for it.
  const furthestSecond = useRef(saved.watched);
  const lastSavedAt = useRef(saved.watched);

  const [duration, setDuration] = useState(0);
  const [watched, setWatched] = useState(saved.watched);
  const [isCompleted, setIsCompleted] = useState(saved.completed);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [pausedByTab, setPausedByTab] = useState(false);
  const [hasError, setHasError] = useState(false);

  const remember = (seconds, completed = false) => {
    lastSavedAt.current = seconds;
    saveProgress(storageKey, { watched: seconds, completed });
  };

  // ---- Video events -------------------------------------------------------

  const handleLoadedMetadata = (event) => {
    const video = event.currentTarget;
    setDuration(video.duration);
    setHasError(false);

    // Resume from where the viewer stopped last time.
    const canResume = !isCompleted && furthestSecond.current > 0;
    if (canResume && furthestSecond.current < video.duration - 1) {
      video.currentTime = furthestSecond.current;
    }
  };

  const handleTimeUpdate = (event) => {
    if (isCompleted) return; // Already finished, so no more rules.

    const video = event.currentTarget;
    if (video.seeking) return;

    const now = video.currentTime;

    // Jumped too far ahead: put them back where they genuinely were.
    if (now > furthestSecond.current + SKIP_TOLERANCE_SECONDS) {
      video.currentTime = furthestSecond.current;
      return;
    }

    if (now > furthestSecond.current) {
      furthestSecond.current = now;
      setWatched(now);

      if (now - lastSavedAt.current >= SAVE_EVERY_SECONDS) {
        remember(now);
      }
    }
  };

  const handleSeeking = (event) => {
    if (isCompleted) return;

    const video = event.currentTarget;
    if (video.currentTime > furthestSecond.current + SKIP_TOLERANCE_SECONDS) {
      video.currentTime = furthestSecond.current;
    }
  };

  const handleRateChange = (event) => {
    // No fast-forwarding through playback speed either.
    const video = event.currentTarget;
    if (video.playbackRate !== 1) video.playbackRate = 1;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setPausedByTab(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsBuffering(false);
    if (!isCompleted) remember(furthestSecond.current);
  };

  const handleEnded = (event) => {
    const finalSecond = event.currentTarget.duration;
    furthestSecond.current = finalSecond;
    setWatched(finalSecond);
    setIsPlaying(false);
    setIsBuffering(false);
    setIsCompleted(true);
    remember(finalSecond, true);
  };

  const handleError = () => {
    setHasError(true);
    console.warn(
      "The workshop video could not be loaded. Check workshop.videoUrl in " +
        "src/data/content.js and make sure the file exists in public/videos/."
    );
  };

  // ---- Side effects -------------------------------------------------------

  // Pause the video when the viewer switches to another tab or app.
  useEffect(() => {
    const pauseIfHidden = () => {
      const video = videoRef.current;
      if (document.hidden && video && !video.paused && !isCompleted) {
        video.pause();
        setPausedByTab(true);
      }
    };

    document.addEventListener("visibilitychange", pauseIfHidden);
    return () => document.removeEventListener("visibilitychange", pauseIfHidden);
  }, [isCompleted]);

  // Save progress when the tab is closed or refreshed.
  useEffect(() => {
    const saveOnExit = () => {
      if (!isCompleted && furthestSecond.current > 0) {
        saveProgress(storageKey, { watched: furthestSecond.current, completed: false });
      }
    };

    window.addEventListener("pagehide", saveOnExit);
    return () => window.removeEventListener("pagehide", saveOnExit);
  }, [isCompleted, storageKey]);

  // Testing shortcut. Only works with `npm run dev` (it does nothing on the
  // live site): open http://localhost:5173/?unlock=1 to skip the video.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (new URLSearchParams(window.location.search).has("unlock")) {
      setIsCompleted(true);
    }
  }, []);

  // ---- Controls and values for the page -----------------------------------

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {
        // The browser refused to play (rare). The viewer can just press play again.
      });
    } else {
      video.pause();
    }
  };

  const totalSeconds = duration || fallbackDuration;
  const remainingSeconds = isCompleted ? 0 : Math.max(0, totalSeconds - watched);
  const progressPercent = isCompleted
    ? 100
    : Math.min(100, (watched / totalSeconds) * 100);

  let status = "idle";
  if (isCompleted) status = "completed";
  else if (isPlaying) status = "playing";
  else if (watched > 0) status = "paused";

  const videoProps = {
    ref: videoRef,
    onLoadedMetadata: handleLoadedMetadata,
    onTimeUpdate: handleTimeUpdate,
    onSeeking: handleSeeking,
    onRateChange: handleRateChange,
    onPlay: handlePlay,
    onPause: handlePause,
    onEnded: handleEnded,
    onError: handleError,
    onWaiting: () => setIsBuffering(true),
    onPlaying: () => setIsBuffering(false),
    onCanPlay: () => setIsBuffering(false),
  };

  return {
    videoRef,
    videoProps,
    togglePlay,
    status,
    isPlaying,
    isBuffering,
    isCompleted,
    pausedByTab,
    hasError,
    watched: isCompleted ? totalSeconds : watched,
    totalSeconds,
    remainingSeconds,
    progressPercent,
  };
}
