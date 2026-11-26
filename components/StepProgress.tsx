/**
 * The "Step 1 of 3" marker shown across the account journey.
 *
 * The coloured bars are decoration, so they are hidden from screen readers and the
 * position is announced once in words instead. Colour alone would tell a person who
 * cannot see it nothing at all.
 */
export default function StepProgress({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <div className="mb-6" role="group" aria-label={`Step ${step} of ${total}`}>
      <p className="mb-2 text-sm text-ink/70">
        Step {step} of {total}
      </p>
      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${index < step ? "bg-plum" : "bg-plum/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
