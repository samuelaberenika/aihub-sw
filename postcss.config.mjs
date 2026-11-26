/**
 * PostCSS pipeline for the stylesheet.
 * Tailwind expands the utility classes, Autoprefixer adds the browser prefixes
 * that older Safari and Firefox still need.
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
