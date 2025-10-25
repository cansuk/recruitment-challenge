import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export default function useFormValidation(defaults?: Partial<ContactFormData>) {
  return useForm<ContactFormData>({
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
      ...defaults,
    },
  });
}
