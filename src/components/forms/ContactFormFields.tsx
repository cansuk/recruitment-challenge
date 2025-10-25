"use client";
import { Controller, type Control, type UseFormTrigger } from "react-hook-form";
import { Input } from "@/components/ui";
import Autocomplete from "@/components/ui/Autocomplete";
import UserIcon from "@/components/icons/UserIcon";
import CompanyIcon from "@/components/icons/CompanyIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import PostcodeIcon from "@/components/icons/PostcodeIcon";
import type { ContactFormData } from "@/lib/validations";

type Props = {
  control: Control<ContactFormData>;
  trigger: UseFormTrigger<ContactFormData>;
};

const postcodeOptions = [
  "N6 1BA",
  "EC1N 2SW",
  "SW1A 1AA",
  "W1A 0AX",
  "M1 1AE",
  "B1 1AA",
];

export default function ContactFormFields({ control, trigger }: Props) {
  return (
    <>
      <div className="mt-[20px]">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              fullWidth
              label="Name"
              icon={<UserIcon className="text-[var(--color-accent)]" />}
              placeholder="Enter your full name"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                void trigger("name");
              }}
              name={field.name}
              error={fieldState.error?.message as string}
              success={fieldState.isTouched && !fieldState.error}
            />
          )}
        />
      </div>
      <div className="mt-[32px]">
        <Controller
          name="company"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              fullWidth
              label="Company"
              icon={<CompanyIcon className="text-[var(--color-accent)]" />}
              placeholder="Enter your company"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                void trigger("company");
              }}
              name={field.name}
              error={fieldState.error?.message as string}
              success={fieldState.isTouched && !fieldState.error}
            />
          )}
        />
      </div>
      <div className="mt-[32px]">
        <Controller
          name="mobile_phone"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              fullWidth
              label="Mobile phone number"
              icon={<PhoneIcon className="text-[var(--color-accent)]" />}
              placeholder="07xxxxxxxxx"
              type="tel"
              inputMode="numeric"
              value={field.value}
              onChange={(e) => {
                const digitsOnly = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 11);
                field.onChange(digitsOnly);
              }}
              onBlur={() => {
                field.onBlur();
                void trigger("mobile_phone");
              }}
              name={field.name}
              error={fieldState.error?.message as string}
              success={fieldState.isTouched && !fieldState.error}
            />
          )}
        />
      </div>
      <div className="mt-[32px]">
        <Controller
          name="email_address"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              fullWidth
              label="Email address"
              icon={<EmailIcon className="text-[var(--color-accent)]" />}
              placeholder="name@example.com"
              inputMode="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                void trigger("email_address");
              }}
              name={field.name}
              error={fieldState.error?.message as string}
              success={fieldState.isTouched && !fieldState.error}
            />
          )}
        />
      </div>
      <div className="mt-[32px]">
        <Controller
          name="postcode"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              fullWidth
              label="Postcode"
              icon={<PostcodeIcon className="text-[var(--color-accent)]" />}
              placeholder="Start typing to match your address"
              value={field.value}
              onChange={field.onChange}
              onSelect={(v) => {
                field.onChange(v);
                void trigger("postcode");
              }}
              onBlur={() => {
                field.onBlur();
                void trigger("postcode");
              }}
              name={field.name}
              error={fieldState.error?.message as string}
              success={fieldState.isTouched && !fieldState.error}
              suggestions={postcodeOptions.filter((o) =>
                o.toLowerCase().includes((field.value || "").toLowerCase()),
              )}
            />
          )}
        />
      </div>
    </>
  );
}
