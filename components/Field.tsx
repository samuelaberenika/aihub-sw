"use client";

import { useId, useState } from "react";

/**
 * A labelled text input, with room for a hint underneath and an error when
 * something is wrong.
 *
 * The hint and the error are linked to the input itself, so a screen reader reads
 * the problem out when the field is focused. The red border is a second signal, not
 * the only one.
 */
export function TextField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
  hint,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
}) {
  const id = useId();
  const describedBy =
    [hint && !error ? id + "-hint" : null, error ? id + "-error" : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={
          "w-full rounded-lg border-2 bg-white px-3 py-2.5 text-ink outline-none transition focus:border-plum " +
          (error ? "border-coral" : "border-ink/20")
        }
      />
      {hint && !error ? (
        <p id={id + "-hint"} className="mt-1.5 text-sm text-ink/70">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={id + "-error"} className="mt-1.5 text-sm font-medium text-plum">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A password field with a Show and Hide control.
 *
 * Typing a long password on a phone is where mistakes happen, so the value can be
 * revealed. The button's own label changes with its state, which means a screen
 * reader announces "Show password" and then "Hide password" instead of the change
 * being visible only.
 */
export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
  hint,
  error,
  aside,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  hint?: string;
  error?: string;
  aside?: React.ReactNode;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const describedBy =
    [hint && !error ? id + "-hint" : null, error ? id + "-error" : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}
        </label>
        {aside}
      </div>
      <div className="flex gap-2">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={
            "w-full rounded-lg border-2 bg-white px-3 py-2.5 text-ink outline-none transition focus:border-plum " +
            (error ? "border-coral" : "border-ink/20")
          }
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="shrink-0 rounded-lg border-2 border-ink/20 bg-white px-3 py-2.5 text-sm font-medium text-ink hover:border-plum"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {hint && !error ? (
        <p id={id + "-hint"} className="mt-1.5 text-sm text-ink/70">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={id + "-error"} className="mt-1.5 text-sm font-medium text-plum">
          {error}
        </p>
      ) : null}
    </div>
  );
}
