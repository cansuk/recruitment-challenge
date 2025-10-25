import BumperLogo from "@/components/icons/BumperLogo";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui";

export default function HeaderPromo() {
  return (
    <div
      className="w-full rounded-b-[16px] border border-text -mt-2"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      <Container className="flex items-center justify-between px-4 sm:px-2">
        <div className="flex items-center gap-1 md:gap-3 pt-4 pb-2">
          <Link href="/" aria-label="Go to homepage">
            <BumperLogo aria-hidden className="h-[28px] md:h-[32px]" />
          </Link>
          <span className="font-sans text-[16px] leading-6 font-extrabold text-black">
            for business
          </span>
        </div>
        <div className="pt-4 pb-2">
          <Button
            rounded="none"
            size="xs"
            icon="none"
            className="md:px-3 md:py-1 md:text-[16px] md:leading-6 md:font-[550]"
          >
            Register
          </Button>
        </div>
      </Container>
    </div>
  );
}
