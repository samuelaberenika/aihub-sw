type NoticeTone = "info" | "privacy" | "error";

/**
 * A tinted box for short messages: a privacy note, an explanation, or a problem.
 *
 * An error is announced straight away by a screen reader, because it appears in
 * response to something the person just did. The quieter messages are left to be
 * read in the normal order.
 */
export default function Notice({
  tone = "info",
  children,
}: {
  tone?: NoticeTone;
  children: React.ReactNode;
}) {
  const tones: Record<NoticeTone, string> = {
    info: "border-periwinkle bg-periwinkle/40 text-ink",
    privacy: "border-periwinkle bg-periwinkle/30 text-ink",
    error: "border-coral bg-coral/15 text-plum",
  };

  return (
    <p
      role={tone === "error" ? "alert" : undefined}
      className={`mb-4 rounded-lg border-2 px-3 py-2.5 text-sm leading-relaxed ${tones[tone]}`}
    >
      {children}
    </p>
  );
}
