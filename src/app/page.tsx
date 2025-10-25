import HeroBanner from "@/components/home/HeroBanner";
import Image from "next/image";
import HeroRating from "@/components/home/HeroRating";
import HeroHeading from "@/components/home/HeroHeading";
import HeroSubheading from "@/components/home/HeroSubheading";
import { Button } from "@/components/ui";
import TextLink from "@/components/ui/TextLink";
import BumperLogo from "@/components/icons/BumperLogo";
import Container from "@/components/layout/Container";
import StepItem from "@/components/shared/StepItem";
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="-mt-[10px]">
        <HeroBanner>
          <div className="flex h-full flex-col justify-center items-start">
            <div className="space-y-8">
              <HeroRating />
              <div className="space-y-4">
                <HeroHeading />
                <div className="space-y-4">
                  <HeroSubheading />
                  <div>
                    <Button size="sm" asChild>
                      <a href="/register">Register your interest</a>
                    </Button>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1 text-white">
                    <span>Already registered?</span>
                    <TextLink href="#">Login</TextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeroBanner>
      </div>

      <section
        aria-label="Main content with image"
        className="px-4 md:pr-12 bg-white"
      >
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="pt-[70px]">
                <BumperLogo
                  aria-hidden
                  height={20}
                  className="h-[20px] w-auto"
                />
              </div>
              <h2 className="font-oswald text-text font-[700] text-[50px] leading-[52px] md:text-[58px] md:leading-[60px] mt-0">
                PAYLATER
              </h2>
              <div className="mt-4 md:hidden flex justify-center">
                <Image
                  src="/images/flying-iphone.png"
                  alt="Phone preview"
                  width={240}
                  height={300}
                  className="w-auto h-[300px]"
                />
              </div>
              <p className="text-text font-normal text-[18px] leading-[28px] md:text-[21px] md:leading-8 max-w-[590px] mt-[24px]">
                Give customers more flexibility at checkout, online and in
                store. Let them spread the cost with interest-free monthly
                payments.
              </p>
              <h3 className="font-inter text-[28px] leading-[40px] md:text-[38px] md:leading-[52px] font-[850] md:font-extrabold text-[var(--color-accent)] max-w-[590px] mt-[24px]">
                No risk to your business.
                <br />
                No worries for your customers.
              </h3>
              <p className="text-text text-[16px] leading-6 font-[850] mt-[24px]">
                It’s as simple as:
              </p>
              <div className="max-w-[590px] space-y-6 py-[16px]">
                <StepItem
                  index={1}
                  title="FIX IT"
                  description="Your customers bring their vehicle to you. You repair and service the car. Everything just like it works right now."
                />
                <StepItem
                  index={2}
                  title="SPLIT IT"
                  description="When the customer gets their bill or quote, your customer chooses the option to ‘PayLater’ and in just a few clicks they’ve been approved and have paid."
                />
                <StepItem
                  index={3}
                  title="SORTED"
                  description="You and your customer part ways happy. You’re paid upfront, directly from Bumper, the customer repays Bumper over their chosen payment plan."
                />
              </div>
              <div className="pt-[24px] pb-[56px]">
                <Button
                  size="sm"
                  className="md:text-[21px] md:leading-[32px] md:px-10"
                  asChild
                >
                  <a href="/register">Register your interest</a>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex w-full justify-center md:justify-end">
              <div className="relative w-full max-w-[520px]">
                <Image
                  src="/images/flying-iphone.png"
                  alt="Phone preview"
                  width={520}
                  height={780}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
