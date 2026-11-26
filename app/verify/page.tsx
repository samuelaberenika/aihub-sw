"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthShell from "@/components/AuthShell";
import StepProgress from "@/components/StepProgress";
import Notice from "@/components/Notice";
import { readDraft } from "@/lib/signup-flow";

/**
 * Step two of the account journey: confirming the email address.
 *
 * Confirming the address is what stops somebody signing up with an address they do
 * not control, so this step stays in the flow. The confirmation email itself is not
 * sent yet, because there is no mail service behind the prototype, and the screen
 * says so rather than pretending a message is on its way.
 */
export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [resent, setResent] = useState(false);

  // The address is read after the page mounts, because storage is not available
  // while the page is being rendered on the server.
  useEffect(() => {
    setEmail(readDraft().email ?? null);
  }, []);

  return (
    <AuthShell>
      <StepProgress step={2} />

      <h1 className="text-3xl font-bold">Check your email</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
        {email ? (
          <>
            We sent a confirmation link to <span className="font-semibold">{email}</span>. Open it
            and your account is ready.
          </>
        ) : (
          <>We sent a confirmation link to the address you just entered.</>
        )}
      </p>

      <div className="mt-5">
        <Notice tone="info">
          Sending email is not switched on in this prototype, so no message has actually gone out.
          Press the button below to carry on where the link would take you.
        </Notice>
      </div>

      <button
        type="button"
        onClick={() => router.push("/choose")}
        className="w-full rounded-lg bg-plum px-4 py-3 font-semibold text-white hover:bg-plum/90"
      >
        I have confirmed my email
      </button>

      <button
        type="button"
        onClick={() => setResent(true)}
        className="mt-3 w-full rounded-lg border-2 border-ink/20 bg-white px-4 py-3 font-medium text-ink hover:border-plum"
      >
        Send the link again
      </button>

      {resent ? (
        <div className="mt-4">
          <Notice tone="info">
            Nothing has been sent, for the same reason: there is no mail service connected yet.
          </Notice>
        </div>
      ) : null}

      <p className="mt-5 text-center text-sm text-ink/80">
        Wrong address?{" "}
        <Link href="/signup" className="font-semibold text-plum underline">
          Start again
        </Link>
      </p>
    </AuthShell>
  );
}
