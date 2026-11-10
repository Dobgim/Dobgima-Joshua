"use client";

import { Fragment, useActionState } from "react";
import { submitReview, type ReviewFormState } from "@/app/reviews/actions";

const initialState: ReviewFormState = { status: "idle", message: "", errors: {} };

const inputClass =
  "mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 sm:text-sm placeholder:text-zinc-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export default function ReviewForm({ projectNames }: { projectNames: string[] }) {
  const [state, formAction, pending] = useActionState(submitReview, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
      >
        {state.message}
      </div>
    );
  }

  const e = state.errors;

  return (
    <form action={formAction} noValidate className="max-w-2xl space-y-5">
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">
          {state.message}
        </p>
      )}

      {/* Honeypot — hidden from people and screen readers */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Your name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            aria-invalid={Boolean(e.name)}
            aria-describedby={e.name ? "name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="name-error" message={e.name} />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium">
            Company / role <span className="text-zinc-500">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="e.g. CEO, Acme Ltd"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            aria-invalid={Boolean(e.email)}
            aria-describedby={e.email ? "email-error email-hint" : "email-hint"}
            className={inputClass}
          />
          <p id="email-hint" className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Never shown publicly. Only used to confirm you&apos;re a real client.
          </p>
          <FieldError id="email-error" message={e.email} />
        </div>
        <div>
          <label htmlFor="project" className="text-sm font-medium">
            Project I worked on
          </label>
          <select id="project" name="project" className={inputClass} defaultValue="">
            <option value="">Choose a project (optional)</option>
            {projectNames.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
            <option value="Tracking website">Tracking website</option>
            <option value="Refund guide website">Refund guide website</option>
            <option value="E-commerce store">E-commerce store</option>
            <option value="Restaurant website">Restaurant website</option>
            <option value="Freelance / client project">Freelance / client project</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <fieldset aria-describedby={e.rating ? "rating-error" : undefined}>
        <legend className="text-sm font-medium">
          Rating <span className="text-red-600">*</span>
        </legend>
        <div className="star-rating mt-1">
          {[5, 4, 3, 2, 1].map((n) => (
            <Fragment key={n}>
              <input
                type="radio"
                id={`rating-${n}`}
                name="rating"
                value={n}
                required
                className="sr-only"
              />
              <label htmlFor={`rating-${n}`} title={`${n} star${n > 1 ? "s" : ""}`}>
                <span className="sr-only">{n} star{n > 1 ? "s" : ""}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
                  <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
                </svg>
              </label>
            </Fragment>
          ))}
        </div>
        <FieldError id="rating-error" message={e.rating} />
      </fieldset>

      <div>
        <label htmlFor="body" className="text-sm font-medium">
          Your review <span className="text-red-600">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          placeholder="What did I build for you, and how was it working together?"
          aria-invalid={Boolean(e.body)}
          aria-describedby={e.body ? "body-error" : undefined}
          className={inputClass}
        />
        <FieldError id="body-error" message={e.body} />
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(e.consent)}
            aria-describedby={e.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-sky-700"
          />
          <span>
            I&apos;m a real client and I agree that my name, company/role and review may be
            published on this website.
          </span>
        </label>
        <FieldError id="consent-error" message={e.consent} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-sky-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
