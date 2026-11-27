import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

/**
 * The Hub's typeface, downloaded at build time and exposed as a CSS variable that
 * tailwind.config.ts reads. Loading it here means every page uses one font file
 * instead of each screen fetching its own.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Hub South West",
  description:
    "Connecting people, ideas and opportunities in ethical AI across the South West.",
  /*
   * The browser tab and bookmark icon. Browsers ask for this separately from the
   * page, so it is declared here and served straight from public/ — one file,
   * the same brand mark the header uses.
   */
  icons: { icon: "/aihub-sw-icon.svg" },
};

/**
 * The frame around every page: the language for screen readers and search engines,
 * the font, and the page background colour.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={dmSans.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
