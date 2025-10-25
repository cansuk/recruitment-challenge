import { z } from "zod";

// Validation schema
export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name must be less than 255 characters")
      .regex(
        /^[a-zA-Z0-9\s]+$/,
        "Name can only contain letters, numbers and spaces",
      ),

    company: z
      .string()
      .min(1, "Company name is required")
      .max(255, "Company name must be less than 255 characters"),

    mobile_phone: z
      .string()
      .min(1, "Mobile phone is required")
      .regex(
        /^0(\s*)(7)(\s*)(\d(\s*)){9}$/,
        "Please enter a valid UK mobile number (e.g., 07123456789)",
      ),

    email_address: z
      .string()
      .min(5, "Email must be at least 5 characters")
      .max(255, "Email must be less than 255 characters")
      .email("Please enter a valid email address"),

    postcode: z
      .string()
      .min(1, "Postcode is required")
      .max(30, "Postcode must be less than 30 characters")
      .regex(
        /^[a-zA-Z0-9\s]+$/,
        "Postcode can only contain letters, numbers and spaces",
      ),

    pay_later: z.boolean(),

    pay_now: z.boolean(),
  })
  .refine((data) => data.pay_later || data.pay_now, {
    message: "Please select at least one payment method",
    path: ["pay_later"],
  });

// TypeScript type export
export type ContactFormData = z.infer<typeof contactFormSchema>;
