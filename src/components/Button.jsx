// The main call-to-action button. Renders a gold link normally,
// and a muted, unclickable button when `disabled` is true.

const baseStyles =
  "inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-base font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/50 sm:w-auto sm:px-10";

export default function Button({ href, disabled = false, children, className = "" }) {
  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={`${baseStyles} cursor-not-allowed border border-white/15 bg-white/5 text-white/60 ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={`${baseStyles} relative overflow-hidden bg-gradient-to-tr from-gold-500 via-gold-400 to-gold-300 text-brand-950 shadow-lg shadow-gold-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/35 active:translate-y-0 active:scale-[0.99] motion-reduce:transform-none ${className}`}
    >
      {/* Thin highlight along the top edge */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" aria-hidden="true" />
      {children}
    </a>
  );
}