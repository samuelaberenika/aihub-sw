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
        {/*
         * The wordmark sits to the right of the mark, as it does on the brand
         * sheet: the mark carries the identity, the wordmark names it. This is
         * the client's own artwork, unaltered, so the header reads exactly as the
         * logo does everywhere else.
         *
         * Unlike the mark this one is a raster file, so it is left to the image
         * pipeline to serve a properly sized version rather than shipping the
         * full-resolution original to a phone.
         *
         * Both images are decorative and carry no alt text: the link around them
         * is already labelled "AI Hub South West home", so a screen reader hears
         * the name once instead of three times.
         */}
        <Image
          src="/aihub-sw-logo.png"
          alt=""
          width={162}
          height={36}
          priority
        />
      </Link>
      {children}
    </main>
  );
}
