"use client";

import { useState } from "react";
import Notice from "./Notice";
import { GoogleMark, LinkedInMark } from "./ProviderMark";

/**
 * The two single sign-on buttons from the design.
 *
 * Google and LinkedIn each need an application registered with the provider, and
 * those credentials belong to the Hub rather than to us, so the account work is
 * scheduled for a later sprint. Until that is done these buttons explain
 * themselves when pressed. A button that silently does nothing reads as broken,
 * especially in front of the client.
 *
 * Each button carries the provider's own mark beside its label, which is what makes
 * the choice readable at a glance on a phone.
 */
export default function SsoButtons() {
  const [pressed, setPressed] = useState<string | null>(null);

  const providers = [
    { id: "google", label: "Continue with Google", short: "Google", mark: <GoogleMark className="h-5 w-5" /> },
    { id: "linkedin", label: "Continue with LinkedIn", short: "LinkedIn", mark: <LinkedInMark className="h-5 w-5" /> },
  ];

  return (
    <div className="mb-4 space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => setPressed(provider.short)}
          className="flex w-full items-center justify-center gap-2.5 rounded-lg border-2 border-ink/20 bg-white px-4 py-3 font-medium text-ink hover:border-plum"
        >
          {provider.mark}
          {provider.label}
        </button>
      ))}

      {pressed ? (
        <Notice tone="info">
          Signing in with {pressed} is not switched on yet, so nothing was sent. Use the email
          form below instead.
        </Notice>
      ) : null}
    </div>
  );
}
