import { CheckIcon, LockIcon } from "./icons";

// High-contrast, crystal-clear step cards for both mobile and desktop
const cardStyles = {
  done: "border-emerald-400/50 bg-[#140b2b] shadow-lg shadow-black/50 hover:border-emerald-400",
  current: "border-2 border-gold-400 bg-[#1a0f35] shadow-xl shadow-gold-500/20 ring-2 ring-gold-400/30",
  locked: "border-white/20 bg-[#120926] shadow-lg shadow-black/50",
};

function StepBadge({ state, number }) {
  const shared =
    "flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow-md transition-all";

  if (state === "done") {
    return (
      <span className={`${shared} bg-emerald-500 text-white shadow-emerald-950/60 ring-2 ring-emerald-400/30`}>
        <CheckIcon className="h-5 w-5 stroke-[2.8]" />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span
        className={`${shared} bg-gradient-to-tr from-gold-500 to-gold-300 text-brand-950 shadow-gold-500/40 ring-2 ring-gold-300 font-extrabold`}
      >
        {number}
      </span>
    );
  }

  return (
    <span className={`${shared} border border-white/25 bg-white/10 text-white/90`}>
      <LockIcon className="h-4 w-4" />
    </span>
  );
}

export default function StepsTracker({ content, isCompleted }) {
  const currentIndex = isCompleted ? 2 : 1;

  return (
    <section className="mt-12 sm:mt-16" aria-labelledby="steps-heading">
      <div className="text-center">
        <h2 id="steps-heading" className="text-xl font-extrabold tracking-tight text-white sm:text-2xl drop-shadow-sm">
          {content.heading}
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-14 rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      </div>

      <ol className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-4">
        {content.items.map((step, index) => {
          const state = index < currentIndex ? "done" : index === currentIndex ? "current" : "locked";

          return (
            <li
              key={step.title}
              className={`relative flex items-start gap-4 rounded-2xl p-4.5 sm:flex-col sm:gap-4 sm:p-5 transition-all ${cardStyles[state]}`}
            >
              <div className="flex w-full items-center justify-between">
                <StepBadge state={state} number={index + 1} />
                <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  Step 0{index + 1}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-white sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-brand-100">
                  {step.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
