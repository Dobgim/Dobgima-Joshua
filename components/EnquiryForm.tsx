"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryFormState } from "@/app/contact/actions";
import { BUDGETS, PROJECT_TYPES } from "@/lib/enquiries";

const initialState: EnquiryFormState = { status: "idle", message: "", errors: {} };

const inputClass =
  "mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/30 sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export default function EnquiryForm({ whatsappUrl }: { whatsappUrl: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
        <p className="font-semibold">{state.message}</p>
        <p className="mt-2 text-sm">
          Need a faster answer?{" "}
          <a href={whatsappUrl} target="_blank" rel="noopener" className="font-semibold underline underline-offset-4">
            Message me on WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  const e = state.errors;
  const described = (key: keyof EnquiryFormState["errors"]) => (e[key] ? `${key}-error` : undefined);

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">
          {state.message}
        </p>
      )}

      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden="true" className="hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className="text-sm font-medium">
            Your name <span className="text-red-600">*</span>
          </label>
          <input id="enq-name" name="name" required maxLength={80} autoComplete="name" aria-invalid={Boolean(e.name)} aria-describedby={described("name")} className={inputClass} />
          <FieldError id="name-error" message={e.name} />
        </div>
        <div>
          <label htmlFor="enq-email" className="text-sm font-medium">
            Email <span className="text-red-600">*</span>
          </label>
          <input id="enq-email" name="email" type="email" required maxLength={200} autoComplete="email" aria-invalid={Boolean(e.email)} aria-describedby={described("email")} className={inputClass} />
          <FieldError id="email-error" message={e.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-type" className="text-sm font-medium">
            Type of project <span className="text-red-600">*</span>
          </label>
          <select id="enq-type" name="project_type" required defaultValue="" aria-invalid={Boolean(e.project_type)} aria-describedby={described("project_type")} className={inputClass}>
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError id="project_type-error" message={e.project_type} />
        </div>
        <div>
          <label htmlFor="enq-budget" className="text-sm font-medium">
            Estimated budget <span className="text-red-600">*</span>
          </label>
          <select id="enq-budget" name="budget" required defaultValue="" aria-invalid={Boolean(e.budget)} aria-describedby={described("budget")} className={inputClass}>
            <option value="" disabled>
              Choose a range
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <FieldError id="budget-error" message={e.budget} />
        </div>
      </div>

      <div>
        <label htmlFor="enq-phone" className="text-sm font-medium">
          Phone or WhatsApp <span className="text-zinc-500">(optional)</span>
        </label>
        <input id="enq-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" aria-invalid={Boolean(e.phone)} aria-describedby={described("phone")} className={inputClass} />
        <FieldError id="phone-error" message={e.phone} />
      </div>

      <div>
        <label htmlFor="enq-description" className="text-sm font-medium">
          Project description <span className="text-red-600">*</span>
        </label>
        <textarea
          id="enq-description"
          name="description"
          required
          minLength={20}
          maxLength={3000}
          rows={6}
          placeholder="What does your business do, what do you want to build, and is there a deadline?"
          aria-invalid={Boolean(e.description)}
          aria-describedby={described("description")}
          className={inputClass}
        />
        <FieldError id="description-error" message={e.description} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-lift w-full rounded-lg bg-zinc-950 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-60 sm:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Your details are only used to reply to your enquiry.
      </p>
    </form>
  );
}
