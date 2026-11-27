import Image from "next/image";
import Link from "next/link";

/**
 * The frame the account screens sit in.
 *
 * The account journey is designed for a phone, so the content stays in a narrow
 * column that reads well on a small screen and does not stretch across a desktop.
 * The brand mark links back to the home page, so nobody gets stuck mid-journey.
 */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-5 pb-20 pt-8">
      <Link
        href="/"
        className="mb-7 inline-flex w-fit items-center gap-3"
        aria-label="AI Hub South West home"
      >
        {/*
         * The Hub's brand mark. `unoptimized` because the file is vector: there is
         * nothing for the image pipeline to resize or re-encode, and running it
         * through anyway would only add a request.
         */}
        <Image
          src="/aihub-sw-icon.svg"
          alt=""
          width={40}
          height={40}
          priority
          unoptimized
        />
        <span className="text-base font-semibold tracking-tight text-plum">
          AI Hub South West
        </span>
      </Link>
      {children}
    </main>
  );
}
