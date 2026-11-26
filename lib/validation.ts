/**
 * The rules the account forms apply before anything is allowed through.
 *
 * These run in the browser so a person is told about a problem while they are still
 * on the field. They are a convenience, not a security control: when the accounts
 * are connected, the same rules have to be enforced again on the server, because
 * anything running in a browser can be bypassed.
 */

/** Minimum password length. Long beats complicated, so the hint suggests a phrase. */
export const MIN_PASSWORD_LENGTH = 12;

/**
 * A practical email check: something before the @, a domain, and a dot in the
 * domain. Deliberately not the full specification - an address that passes this can
 * still be wrong, and only a confirmation email proves it works.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

export function emailError(email: string): string | null {
  const value = email.trim();
  if (!value) return "Enter your email address.";
  if (!EMAIL_PATTERN.test(value)) return "That email address does not look right. Check for a typo.";
  return null;
}

export function passwordError(password: string): string | null {
  if (!password) return "Enter a password.";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters. A few random words works well.`;
  }
  return null;
}

/** Trims a field before it is stored or compared. */
export function tidy(value: string): string {
  return value.trim();
}
