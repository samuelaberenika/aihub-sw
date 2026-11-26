/**
 * The AI Hub South West palette, taken from the client's brand sheet.
 *
 * Kept in one file so a colour is named once and referenced everywhere. The same
 * values are repeated in tailwind.config.ts under matching names, so a page can use
 * `bg-plum` in markup or `palette.plum` in script and get the same colour.
 */
export const palette = {
  ink: "#212120",
  plum: "#631549",
  teal: "#225652",
  yellow: "#EFE52E",
  coral: "#FF634A",
  pink: "#E8CAE0",
  periwinkle: "#C1C8E6",
  sand: "#DDC8BC",
} as const;

/** Names for the colours used behind each audience card. */
export type AudienceTone = "coral" | "plum" | "periwinkle" | "yellow";

export type Audience = {
  id: AudienceId;
  label: string;
  summary: string;
  detail: string;
  tone: AudienceTone;
  /** True when a person has to be reviewed by the Hub before their profile goes live. */
  needsReview: boolean;
};

export type AudienceId = "business" | "provider" | "education" | "curious";

/**
 * The four groups the platform is built for, in the order the Hub presents them.
 * A new account picks one of these and is routed to the dashboard that suits it.
 */
export const audiences: Audience[] = [
  {
    id: "business",
    label: "Business",
    summary: "Org profile",
    detail: "Solve a problem. Find talent, discover funding.",
    tone: "coral",
    needsReview: false,
  },
  {
    id: "provider",
    label: "AI provider",
    summary: "Hub review first",
    detail: "Share your expertise and reach local clients.",
    tone: "plum",
    needsReview: true,
  },
  {
    id: "education",
    label: "Education",
    summary: "Students, staff",
    detail: "Placements, events and industry links.",
    tone: "periwinkle",
    needsReview: false,
  },
  {
    id: "curious",
    label: "Curious",
    summary: "Light profile",
    detail: "Plain-English explainers and local news.",
    tone: "yellow",
    needsReview: false,
  },
];

/** Finds an audience by its id, for the dashboard at the end of the journey. */
export function audienceById(id: string | null | undefined): Audience | undefined {
  return audiences.find((a) => a.id === id);
}
