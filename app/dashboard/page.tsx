"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthShell from "@/components/AuthShell";
import Notice from "@/components/Notice";
import { audienceById, type Audience } from "@/lib/palette";
import { readDraft } from "@/lib/signup-flow";

/**
 * Where the account journey ends.
 *
 * The dashboard a person sees depends on the path they chose, which is the whole
 * point of asking. What is built here is the shape of it: the panels that will hold
 * the real content are named, so the structure can be reviewed before the content
 * exists. Providers see the review state, because their profile is checked by the
 * Hub before it appears in the directory.
 */
const panels: Record<string, string[]> = {
  business: ["Your matches", "Experts you have saved", "Events near you"],
  provider: ["Your listing", "Enquiries", "Events and content for your sector"],
  education: ["Placements and projects", "Events", "Explainers for the classroom"],
  curious: ["Explainers for you", "Local events", "What the Hub does"],
};

export default function DashboardPage() {
  const [audience, setAudience] = useState<Audience | undefined>(undefined);
  const [email, setEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Read the journey details once the page is running in the browser.
  useEffect(() => {
    const draft = readDraft();
    setAudience(audienceById(draft.audience));
    setEmail(draft.email ?? null);
    setLoaded(true);
  }, []);

  const items = audience ? panels[audience.id] : [];

  return (
    <AuthShell>
      <h1 className="text-3xl font-bold">
        {audience ? `You are set up as ${audience.label}` : "You are in"}
      </h1>
      <p className="mt-1.5 text-sm text-ink/80">
        {email ? `Signed up with ${email}.` : "Your account is ready."}
      </p>

      {audience?.needsReview ? (
        <div className="mt-5">
          <Notice tone="info">
            Your listing is with the Hub for review. You will be able to edit your profile and see
            the outcome here.
          </Notice>
        </div>
      ) : null}

      {loaded && !audience ? (
        <div className="mt-5">
          <Notice tone="info">
            No path has been chosen yet.{" "}
            <Link href="/choose" className="font-semibold text-plum underline">
              Choose one
            </Link>{" "}
            to see the dashboard that fits you.
          </Notice>
        </div>
      ) : null}

      {items.length > 0 ? (
        <section className="mt-7">
          <h2 className="text-lg font-bold">What is coming here</h2>
          <ul className="mt-3 space-y-2">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-lg border-2 border-ink/15 bg-white px-4 py-3 text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-8 text-center text-sm text-ink/80">
        <Link href="/" className="font-semibold text-plum underline">
          Back to the start
        </Link>
      </p>
    </AuthShell>
  );
}
