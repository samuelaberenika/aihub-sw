"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthShell from "@/components/AuthShell";
import StepProgress from "@/components/StepProgress";
import AudienceCard from "@/components/AudienceCard";
import { audiences, type AudienceId } from "@/lib/palette";
import { saveDraft } from "@/lib/signup-flow";

/**
 * Step three of the account journey: choosing which of the four groups the person
 * belongs to.
 *
 * The choice decides which dashboard they land on and which parts of the Hub are
 * put in front of them first. It is described as changeable, because forcing a
 * visitor to commit at the door loses the ones who are only looking - and the
 * public path needs no review at all.
 */
export default function ChoosePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<AudienceId | null>(null);

  function handleContinue() {
    if (!selected) return;
    saveDraft({ audience: selected });
    router.push("/dashboard");
  }

  return (
    <AuthShell>
      <StepProgress step={3} />

      <h1 className="text-3xl font-bold">Choose your path</h1>
      <p className="mt-1.5 text-sm text-ink/80">
        Pick the one that fits you best. You can always change it later.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {audiences.map((audience) => (
          <AudienceCard
            key={audience.id}
            audience={audience}
            selected={selected === audience.id}
            onSelect={() => setSelected(audience.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!selected}
        className="mt-6 w-full rounded-lg bg-plum px-4 py-3 font-semibold text-white hover:bg-plum/90 disabled:cursor-not-allowed disabled:bg-plum/40"
      >
        Continue
      </button>

      <p className="mt-3 text-center text-sm text-ink/70">
        Providers are checked by the Hub before their profile goes live.
      </p>
    </AuthShell>
  );
}
