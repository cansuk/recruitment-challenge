"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";
import ContactFormFields from "./ContactFormFields";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export default function ContactForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      mobile_phone: "",
      email_address: "",
      postcode: "",
      pay_later: false,
      pay_now: false,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed");
        await res.json();
        router.push("/interested-dealerships");
      })
      .catch((e) => console.error(e));
  };

  const payLaterVal = watch("pay_later");
  const payNowVal = watch("pay_now");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full md:w-[60%] bg-white p-[45px] rounded-[40px] border border-text 
        mt-6 px-[16px] py-[24px] md:px-[45px] md:py-[45px]"
    >
      <h2 className="font-inter text-black font-[850] text-[16px] leading-6 md:font-extrabold md:text-[21px] md:leading-8">
        Join our network
      </h2>
      <p className="text-black font-normal text-[16px] leading-6 md:text-[21px] md:leading-8">
        Free to join, no monthly fees
      </p>

      <ContactFormFields control={control} trigger={trigger} />
      <PaymentMethodSelector
        control={control}
        trigger={trigger}
        errors={errors}
        payLaterVal={!!payLaterVal}
        payNowVal={!!payNowVal}
      />

      <div className="mt-[32px]">
        <Button size="sm" className="leading-6" fullWidth type="submit">
          Register
        </Button>
      </div>
    </form>
  );
}
