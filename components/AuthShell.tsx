import Image from "next/image";
import Link from "next/link";

/**
 * The frame the account screens sit in.
 *
 * The account journey is designed for a phone, so the content stays in a narrow
 * column that reads well on a small screen and does not stretch across a desktop.
 * The wordmark links back to the home page, so nobody gets stuck mid-journey.
 */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-5 pb-20 pt-8">
      <Link href="/" className="mb-7 inline-flex w-fit" aria-label="AI Hub South West home">
        <Image src="/aihub-sw-logo.png" alt="AI Hub South West" width={196} height={44} priority />
      </Link>
      {children}
    </main>
  );
}
