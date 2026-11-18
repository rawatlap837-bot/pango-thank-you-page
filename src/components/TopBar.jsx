import { DumbbellIcon } from "./icons";

// Brand strip at the top of the page: logo mark + name.
export default function TopBar({ brandName }) {
  return (
    <header className="flex items-center justify-center px-4 pb-1 pt-3">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-gold-500 to-gold-300 text-brand-950 shadow-md shadow-gold-500/20"
          aria-hidden="true"
        >
          <DumbbellIcon className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold tracking-wide text-white/90">{brandName}</span>
      </div>
    </header>
  );
}