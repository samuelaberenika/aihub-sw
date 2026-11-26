"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthShell from "@/components/AuthShell";
import StepProgress from "@/components/StepProgress";
import Notice from "@/components/Notice";
import SsoButtons from "@/components/SsoButtons";
import { PasswordField, TextField } from "@/components/Field";
import { emailError, passwordError, tidy, MIN_PASSWORD_LENGTH } from "@/lib/validation";
import { saveDraft } from "@/lib/signup-flow";

/**
 * Step one of the account journey: collecting an email address and a password.
 *
 * Everything here runs in the browser, so the person is told about a problem while
 * they are still looking at the field. When accounts are connected, the same checks
 * have to be repeated on the server: a rule enforced only in a browser can be
 * bypassed.
 */
export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = {
      email: emailError(email) ?? undefined,
      password: passwordError(password) ?? undefined,
    };
    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      setFormError("Check the highlighted fields and try again.");
      return;
    }

    setFormError(null);
    // The address is carried to the next step in this tab only, never in the URL.
    saveDraft({ email: tidy(email) });
    router.push("/verify");
  }

  return (
    <AuthShell>
      <StepProgress step={1} />

      <h1 className="text-3xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-ink/80">Free to join. No payment details needed.</p>

      <div className="mt-6">
        <SsoButtons />
      </div>

      <p className="mb-4 text-center text-sm text-ink/70">
        We only receive your name and email. We never post for you.
      </p>

      <div className="mb-5 flex items-center gap-3 text-sm text-ink/60">
        <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
        or use your email
        <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {formError ? <Notice tone="error">{formError}</Notice> : null}

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
          autoComplete="new-password"
          hint={`At least ${MIN_PASSWORD_LENGTH} characters. A few random words works well.`}
          error={errors.password}
        />

        <div className="mb-5">
          <Notice tone="privacy">
            We only use your details to run the Hub and match you with people. You choose what is
            shared next.
          </Notice>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-plum px-4 py-3 font-semibold text-white hover:bg-plum/90"
        >
          Create account
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-ink/80">
        Already a member?{" "}
        <Link href="/login" className="font-semibold text-plum underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
