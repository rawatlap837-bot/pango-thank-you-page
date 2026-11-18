import { formatTime } from "../utils/formatTime";
import { ClockIcon } from "./icons";

// Compact highlighted countdown. It only moves while the video is playing.

const dotStyles = {
  idle: "bg-white/60",
  paused: "bg-gold-400",
  playing: "animate-pulse bg-emerald-400 motion-reduce:animate-none",
  completed: "bg-emerald-400",
};

export default function WatchTimer({ text, status, remainingSeconds, progressPercent, durationMinutes }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold-400/50 bg-brand-950/90 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-sm sm:px-5 sm:py-3.5">
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-xs font-semibold text-white sm:text-sm">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotStyles[status]}`} aria-hidden="true" />
          <span className="truncate">{text[status]}</span>
        </p>

        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20 sm:w-28">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-brand-100 sm:text-xs">
            {Math.floor(progressPercent)}% of {durationMinutes} min
          </span>
        </div>
      </div>

      <div
        role="timer"
        className="flex shrink-0 items-center gap-2 rounded-xl border border-gold-400/50 bg-black/40 px-3.5 py-1.5 sm:px-4 sm:py-2"
      >
        <ClockIcon className="h-4 w-4 shrink-0 text-gold-400 sm:h-5 sm:w-5" />
        <span className="sr-only">Time left: </span>
        <span className="text-xl font-extrabold tabular-nums leading-none text-gold-300 sm:text-3xl">
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
}