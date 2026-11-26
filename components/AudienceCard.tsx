import type { Audience } from "@/lib/palette";

/**
 * One of the four cards a new account chooses between.
 *
 * Each card carries a background colour from the brand palette and the same ink
 * text, which keeps the contrast high on every colour. The selected card is marked
 * with a border and the word "selected" rather than colour alone, so the state is
 * clear without relying on being able to tell the colours apart.
 */
export default function AudienceCard({
  audience,
  selected,
  onSelect,
}: {
  audience: Audience;
  selected: boolean;
  onSelect: () => void;
}) {
  const backgrounds: Record<Audience["tone"], string> = {
    coral: "bg-coral",
    plum: "bg-plum text-white",
    periwinkle: "bg-periwinkle",
    yellow: "bg-yellow",
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`rounded-xl border-4 p-4 text-left transition ${backgrounds[audience.tone]} ${
        selected ? "border-teal" : "border-transparent"
      }`}
    >
      <span className="block text-base font-bold">
        {audience.label}
        {selected ? " - selected" : ""}
      </span>
      <span className="mt-0.5 block text-sm font-semibold opacity-90">{audience.summary}</span>
      <span className="mt-1.5 block text-sm leading-snug opacity-90">{audience.detail}</span>
      {audience.needsReview ? (
        <span className="mt-2 block text-xs font-semibold uppercase tracking-wide opacity-90">
          Checked by the Hub before it goes live
        </span>
      ) : null}
    </button>
  );
}
