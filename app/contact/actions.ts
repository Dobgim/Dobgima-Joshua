"use server";

import { BUDGETS, PROJECT_TYPES, insertEnquiry } from "@/lib/enquiries";

export interface EnquiryFormState {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "phone" | "project_type" | "budget" | "description", string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitEnquiry(
  _prev: EnquiryFormState,
  form: FormData,
): Promise<EnquiryFormState> {
  // Honeypot: real people never see or fill this field.
  if (text(form, "website")) {
    return { status: "success", message: "Thank you! Your enquiry was received.", errors: {} };
  }

  const name = text(form, "name");
  const email = text(form, "email");
  const phone = text(form, "phone");
  const project_type = text(form, "project_type");
  const budget = text(form, "budget");
  const description = text(form, "description");

  const errors: EnquiryFormState["errors"] = {};
  if (name.length < 2 || name.length > 80) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";
  if (phone.length > 40) errors.phone = "Please enter a shorter phone number.";
  if (!(PROJECT_TYPES as readonly string[]).includes(project_type)) errors.project_type = "Please choose a project type.";
  if (!(BUDGETS as readonly string[]).includes(budget)) errors.budget = "Please choose an estimated budget.";
  if (description.length < 20 || description.length > 3000)
    errors.description = "Please describe your project in at least 20 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  const ok = await insertEnquiry({ name, email, phone: phone || null, project_type, budget, description });
  if (!ok) {
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please try again, or message me on WhatsApp.",
      errors: {},
    };
  }

  return {
    status: "success",
    message: `Thank you, ${name.split(" ")[0]}! Your enquiry was received. I will review it and reply to you by email.`,
    errors: {},
  };
}
