import { CheckCircleIcon } from "./icons";

// Heading block with single clean icon status badge
export default function ConfirmationHero({ content }) {
  const [titleLead, ...titleRest] = content.title.split("!");

  return (
    <div className="pt-4 text-center sm:pt-7">
      {/* Clean Booking Confirmed Badge with single icon */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-[#0c1f17] px-3.5 py-1.5 shadow-md shadow-emerald-950/50">
        <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-400" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-300">
          {content.badge}
        </span>
      </div>

      <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2rem,5.5vw,3.25rem)] font-black leading-[1.08] text-white drop-shadow-sm sm:mt-5">
        {titleRest.length > 0 ? (
          <>
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent">
              {titleLead}!
            </span>{" "}
            <span>{titleRest.join("!").trim()}</span>
          </>
        ) : (
          content.title
        )}
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-100 sm:mt-4 sm:text-lg font-normal">
        {content.subtitle}
      </p>
    </div>
  );
}
