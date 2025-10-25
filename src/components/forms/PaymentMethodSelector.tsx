"use client";
import {
  Controller,
  type Control,
  type UseFormTrigger,
  type FieldErrors,
} from "react-hook-form";
import { Checkbox } from "@/components/ui";
import type { ContactFormData } from "@/lib/validations";

type Props = {
  control: Control<ContactFormData>;
  trigger: UseFormTrigger<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
  payLaterVal: boolean;
  payNowVal: boolean;
};

export default function PaymentMethodSelector({
  control,
  trigger,
  errors,
  payLaterVal,
  payNowVal,
}: Props) {
  const groupError = !!errors.pay_later?.message;
  return (
    <div className="mt-[32px]">
      <div className="text-text text-[16px] leading-6 font-extrabold mb-2">
        What services are you interested in?
      </div>
      <p className="text-[14px] leading-5 text-[#737373] mb-3">
        Please select the services you’re interested in offering your customers
      </p>
      <div className="flex gap-3">
        <Controller
          name="pay_later"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="PayLater"
              checked={!!field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                void trigger(["pay_later", "pay_now"]);
              }}
              onBlur={() => {
                void trigger(["pay_later", "pay_now"]);
              }}
              error={groupError}
              success={(payLaterVal || payNowVal) && !groupError}
            />
          )}
        />
        <Controller
          name="pay_now"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="PayNow"
              checked={!!field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                void trigger(["pay_later", "pay_now"]);
              }}
              onBlur={() => {
                void trigger(["pay_later", "pay_now"]);
              }}
              error={groupError}
              success={(payLaterVal || payNowVal) && !groupError}
            />
          )}
        />
      </div>
      {errors.pay_later?.message && groupError ? (
        <p className="mt-1.5 text-[12px] leading-4 font-normal text-error">
          {errors.pay_later.message}
        </p>
      ) : null}
    </div>
  );
}
