"use client";

import Link from "next/link";
import { useState } from "react";
import AuthShell from "@/components/AuthShell";
import Notice from "@/components/Notice";
import SsoButtons from "@/components/SsoButtons";
import { PasswordField, TextField } from "@/components/Field";
import { emailError, tidy } from "@/lib/validation";

/**
 * The sign-in screen.
 *
 * The form validates what a person types and reports anything wrong on the field
 * itself. It cannot yet say whether an email and password are correct, because
 * there is no account store behind it, so it says that plainly rather than showing
 * a made-up "wrong password" message that no check produced.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [notConnected, setNotConnected] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotConnected(false);
    setLinkSent(false);

    const nextErrors = {
      email: emailError(email) ?? undefined,
      password: password ? undefined : "Enter your password.",
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      setFormError("Check your email and password, then try again.");
      return;
    }

    setFormError(null);
    setNotConnected(true);
  }

  return (
    <AuthShell>
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-ink/80">Log in to your Hub account.</p>

      <div className="mt-6">
        <SsoButtons />
      </div>

      <div className="mb-5 flex items-center gap-3 text-sm text-ink/60">
        <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
        or log in with email
        <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {formError ? <Notice tone="error">{formError}</Notice> : null}

        {notConnected ? (
          <Notice tone="info">
            Those details look right, but signing in is not switched on yet, so nothing was sent.
            Accounts arrive with the back end in a later sprint.{" "}
            <Link href="/choose" className="font-semibold text-plum underline">
              Continue through the prototype
            </Link>
            .
          </Notice>
        ) : null}

        <TextField
          label="Email address"
          value={email}
          onChange={setEmail}
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          error={errors.email}
        />

        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          error={errors.password}
          aside={
            <Link href="/login" className="text-sm font-medium text-plum underline">
              Forgot password?
            </Link>
          }
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-plum px-4 py-3 font-semibold text-white hover:bg-plum/90"
        >
          Log in
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setNotConnected(false);
          setLinkSent(true);
        }}
        className="mt-3 w-full rounded-lg border-2 border-ink/20 bg-white px-4 py-3 font-medium text-ink hover:border-plum"
      >
        Email me a sign-in link
      </button>

      {linkSent ? (
        <div className="mt-4">
          <Notice tone="info">
            Sending email needs the account back end, so no message is on its way yet. Nothing was
            sent to {tidy(email) || "that address"}.
          </Notice>
        </div>
      ) : null}

      <p className="mt-5 text-center text-sm text-ink/80">
        New to the Hub?{" "}
        <Link href="/signup" className="font-semibold text-plum underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
