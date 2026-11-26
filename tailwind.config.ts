import type { Config } from "tailwindcss";

/**
 * Tailwind configuration.
 *
 * The colour names below mirror the palette in the AI Hub South West brand sheet,
 * so pages refer to `plum` or `periwinkle` rather than raw hex values. Changing a
 * brand colour means changing it here once, not in every component.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#212120",
        plum: "#631549",
        teal: "#225652",
        yellow: "#EFE52E",
        coral: "#FF634A",
        pink: "#E8CAE0",
        periwinkle: "#C1C8E6",
        sand: "#DDC8BC",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
