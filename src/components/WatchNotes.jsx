import { CheckIcon, LockIcon, PauseIcon } from "./icons";

// Short reminders under the timer with clean spacing
const noteIcons = {
  lock: LockIcon,
  pause: PauseIcon,
  check: CheckIcon,
};

export default function WatchNotes({ items }) {
  return (
    <ul className="flex flex-wrap justify-center gap-2 pt-1.5 pb-4 sm:gap-2.5 sm:pb-6">
      {items.map((note) => {
        const Icon = noteIcons[note.icon] ?? CheckIcon;

        return (
          <li
            key={note.text}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-brand-950/80 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-gold-400" />
            <span>{note.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
