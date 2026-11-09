"use server";

import { insertReview, reviewsConfigured } from "@/lib/reviews";

export interface ReviewFormState {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "rating" | "body" | "consent", string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitReview(
  _prev: ReviewFormState,
  form: FormData,
): Promise<ReviewFormState> {
  // Honeypot: real people never see or fill this field.
  if (text(form, "website")) {
    return { status: "success", message: "Thank you! Your review was received.", errors: {} };
  }

  const name = text(form, "name");
  const company = text(form, "company");
  const project = text(form, "project");
  const email = text(form, "email");
  const body = text(form, "body");
  const rating = Number(text(form, "rating"));
  const consent = form.get("consent") === "on";

  const errors: ReviewFormState["errors"] = {};
  if (name.length < 2 || name.length > 80) errors.name = "Please enter your name (2–80 characters).";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Please choose a rating from 1 to 5 stars.";
  if (body.length < 20 || body.length > 2000) errors.body = "Please write between 20 and 2,000 characters.";
  if (!consent) errors.consent = "Please agree so your review can be published.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  if (!reviewsConfigured) {
    return {
      status: "error",
      message: "Reviews aren't switched on yet. Please email your review to dobgimajoshua52@gmail.com instead.",
      errors: {},
    };
  }

  const ok = await insertReview({
    name,
    company: company.slice(0, 120) || null,
    project: project.slice(0, 120) || null,
    rating,
    body,
    email,
    consent: true,
  });

  if (!ok) {
    return {
      status: "error",
      message: "Something went wrong saving your review. Please try again in a moment.",
      errors: {},
    };
  }

  return {
    status: "success",
    message: "Thank you! Your review was received and will appear here once it has been checked.",
    errors: {},
  };
}
