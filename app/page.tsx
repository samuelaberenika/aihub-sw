import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import Notice from "@/components/Notice";

/**
 * The entry point for the prototype.
 *
 * The full landing page, with the expert search, the audience picker and the
 * latest content, is the next piece of front-end work. This page exists so the
 * account journey has somewhere to start and the routes are reachable, rather than
 * being a half-built version of the real home page.
 */
export default function HomePage() {
  return (
    <AuthShell>
      <h1 className="text-3xl font-bold leading-tight">
        The South West&apos;s living AI network
      </h1>
      <p className="mt-2 text-base leading-relaxed text-ink/80">
        Tell us what is slowing your business down. We will help you find verified local experts
        who can help.
      </p>

      <div className="mt-7 space-y-3">
        <Link
          href="/signup"
          className="block rounded-lg bg-plum px-4 py-3 text-center font-semibold text-white hover:bg-plum/90"
        >
          Create an account
        </Link>
        <Link
          href="/login"
          className="block rounded-lg border-2 border-plum px-4 py-3 text-center font-semibold text-plum hover:bg-white"
        >
          Log in
        </Link>
      </div>

      <div className="mt-7">
        <Notice tone="info">
          This is the account journey running on its own, ahead of the expert search and the
          directory. Browsing and starting a match will not need an account at all.
        </Notice>
      </div>
    </AuthShell>
  );
}
