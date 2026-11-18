import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/formatTime";
import {
  ExitFullscreenIcon,
  FullscreenIcon,
  MutedIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon,
} from "./icons";

// A video with our own controls: play/pause, volume and fullscreen.
// There is deliberately no seek bar, so the viewer can't skip ahead.

const controlButton =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:h-11 sm:w-11";

// Text on the big play button, depending on where the viewer is
function getOverlayText(status, watchedSeconds) {
  if (status === "paused") {
    return { title: "Resume Watching", hint: `You're at ${formatTime(watchedSeconds)}` };
  }
  if (status === "completed") {
    return { title: "Watch Again", hint: "You've finished the video" };
  }
  return { title: "Start Watching", hint: "Tap to play with sound" };
}

export default function VideoPlayer({ gate, videoUrl, posterUrl, title }) {
  const frameRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { videoProps, togglePlay, status, isPlaying, isBuffering, isCompleted, pausedByTab, hasError } = gate;

  // Keep our fullscreen button in sync when the viewer presses Esc.
  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  // When the video ends, leave fullscreen so the unlocked section is visible.
  useEffect(() => {
    if (isCompleted && document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    }
  }, [isCompleted]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    const frame = frameRef.current;
    const video = gate.videoRef.current;

    if (frame?.requestFullscreen) {
      frame.requestFullscreen();
    } else if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen(); // iPhone Safari
    }
  };

  // Ask the browser to load the video again (used by the "Try Again" button)
  const retryLoading = () => gate.videoRef.current?.load();

  const overlay = getOverlayText(status, gate.watched);

  return (
    <div className="relative">
      {/* Soft glow behind the video */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-600/30 via-gold-400/15 to-brand-500/30 opacity-80 blur-xl"
        aria-hidden="true"
      />

      <div
        ref={frameRef}
        className={`relative overflow-hidden bg-black ${isFullscreen
            ? "flex h-full w-full flex-col"
            : "rounded-2xl border border-white/15 shadow-2xl shadow-black/70 sm:rounded-3xl"
          }`}
      >
        <div className={`relative ${isFullscreen ? "min-h-0 flex-1" : "aspect-video"}`}>
          <video
            {...videoProps}
            src={videoUrl}
            poster={posterUrl || undefined}
            muted={isMuted}
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
            onContextMenu={(event) => event.preventDefault()}
            onClick={togglePlay}
            aria-label={title}
            className="h-full w-full bg-black object-contain"
          />

          {/* Spinner while the video is buffering */}
          {isPlaying && isBuffering && !hasError && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-gold-400 motion-reduce:animate-none" />
            </div>
          )}

          {/* Shown if the video can't be loaded */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-950 px-6 text-center">
              <p className="text-base font-bold text-white sm:text-xl">We couldn't load the video</p>
              <p className="max-w-sm text-xs leading-relaxed text-brand-100 sm:text-sm">
                Please check your internet connection and try again.
              </p>
              <button
                type="button"
                onClick={retryLoading}
                className="mt-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Big play / resume button */}
          {!hasError && !isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 px-4 text-center transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold-400"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-gold-500 to-gold-300 text-brand-950 shadow-glow transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none sm:h-20 sm:w-20">
                <PlayIcon className="ml-1 h-7 w-7 sm:h-9 sm:w-9" />
              </span>
              <span className="text-lg font-bold text-white sm:text-2xl">{overlay.title}</span>
              <span className="rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-xs font-medium text-white sm:text-sm">
                {pausedByTab ? "Paused because you left this tab" : overlay.hint}
              </span>
            </button>
          )}
        </div>

        {/* Control bar */}
        <div className="flex items-center gap-1.5 border-t border-white/10 bg-brand-950 px-2 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className={controlButton}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div
            role="progressbar"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.floor(gate.progressPercent)}
            title="Skipping is turned off"
            className="mx-1 h-1.5 flex-1 overflow-hidden rounded-full bg-white/20"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-[width] duration-300"
              style={{ width: `${gate.progressPercent}%` }}
            />
          </div>

          <span className="whitespace-nowrap text-xs font-semibold tabular-nums text-white sm:text-sm">
            {formatTime(gate.watched)}
            <span className="hidden text-white/70 xs:inline"> / {formatTime(gate.totalSeconds)}</span>
          </span>

          <button
            type="button"
            onClick={() => setIsMuted((muted) => !muted)}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className={controlButton}
          >
            {isMuted ? <MutedIcon /> : <VolumeIcon />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className={controlButton}
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}