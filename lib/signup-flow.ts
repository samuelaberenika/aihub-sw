/**
 * Holds the details a person has already given while they move through the account
 * steps, which are three separate pages.
 *
 * The values live in this browser tab only, never in the address bar, so an email
 * address cannot end up in a browser history entry, a bookmark or a server log.
 * Nothing is sent anywhere: this is a prototype of the journey, not a live account.
 */

import type { AudienceId } from "./palette";

export type SignupDraft = {
  email?: string;
  audience?: AudienceId;
};

const STORAGE_KEY = "aihub-sw-signup";

/** Reads what has been collected so far. Returns an empty draft on the server. */
export function readDraft(): SignupDraft {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SignupDraft) : {};
  } catch {
    // A browser with storage switched off should still be able to use the forms.
    return {};
  }
}

/** Adds to the draft without losing anything already saved. */
export function saveDraft(patch: SignupDraft): void {
  if (typeof window === "undefined") return;
  try {
    const next = { ...readDraft(), ...patch };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Nothing to do: the journey still works, the details just are not remembered.
  }
}

/** Clears the draft once an account exists, or when the person starts again. */
export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore: nothing stored means nothing to clear.
  }
}
