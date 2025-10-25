"use client";

import Link from "next/link";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import TextLink from "@/components/ui/TextLink";
import ContactForm from "@/components/forms/ContactForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#5A698C] text-text">
      <section className="-mt-4 py-10 px-2">
        <div className="mx-auto w-full md:w-[60%] pb-[20px]">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:opacity-90 cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeftIcon className="text-white w-5 h-5" />
          </Link>
        </div>
        <div className="mx-auto w-full md:w-[60%] pb-[20px]">
          <h2 className="font-inter text-white font-[850] md:font-extrabold text-[28px] leading-[40px] md:text-[38px] md:leading-[52px]">
            Join our network
          </h2>
        </div>
        <div className="mx-auto w-full md:w-[60%] pb-[20px]">
          <p className="text-white text-[16px] leading-6">
            Offer <strong className="font-extrabold">PayLater</strong> to split
            servicing and repair work into monthly instalments - interest-free.
            <br /> Use <strong className="font-extrabold">PayNow</strong> to
            take secure payments online.
          </p>
        </div>
        <ContactForm />
        <div className="mt-3 flex justify-center items-baseline gap-1 text-text">
          <span>Already registered?</span>
          <TextLink href="#">Login</TextLink>
        </div>
      </section>
    </main>
  );
}
