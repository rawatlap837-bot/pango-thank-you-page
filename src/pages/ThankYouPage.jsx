import ConfirmationHero from "../components/ConfirmationHero";
import PageBackground from "../components/PageBackground";
import VideoPlayer from "../components/VideoPlayer";
import WatchNotes from "../components/WatchNotes";
import WatchTimer from "../components/WatchTimer";
import { hero, notes, timerText, workshop } from "../data/content";
import useVideoGate from "../hooks/useVideoGate";

export default function ThankYouPage() {
  // One hook tracks the video. Every section below just reads from `gate`.
  const gate = useVideoGate({
    storageKey: workshop.storageKey,
    fallbackDuration: workshop.durationMinutes * 60,
  });

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#060314] pt-[max(0.75rem,env(safe-area-inset-top))] pb-14 sm:pb-20">
      <PageBackground />

      {/* Everything inside sits above the background */}
      <div className="relative z-10">
        <main className="mx-auto w-full max-w-4xl px-3 pb-8 xs:px-4 sm:px-6 sm:pb-12">
          <ConfirmationHero content={hero} />

          <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-4">
            <VideoPlayer
              gate={gate}
              videoUrl={workshop.videoUrl}
              posterUrl={workshop.posterUrl}
              title={workshop.videoTitle}
            />
            <WatchTimer
              text={timerText}
              status={gate.status}
              remainingSeconds={gate.remainingSeconds}
              progressPercent={gate.progressPercent}
              durationMinutes={workshop.durationMinutes}
            />
            <WatchNotes items={notes} />
          </div>
        </main>
      </div>

      {/* Read out by screen readers when the video finishes */}
      <p className="sr-only" aria-live="polite">
        {gate.isCompleted ? "Video finished. Your next step is unlocked." : ""}
      </p>
    </div>
  );
}
