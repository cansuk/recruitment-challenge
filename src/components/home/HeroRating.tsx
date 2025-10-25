import FiveStars from "@/components/icons/FiveStars";
import SingleStar from "@/components/icons/SingleStar";
import TrustpilotWordmark from "@/components/icons/TrustpilotWordmark";
import Container from "@/components/layout/Container";

export default function HeroRating() {
  return (
    <Container>
      <div className="flex items-center gap-[2px] text-white leading-none">
        <span className="font-extrabold text-[16px] leading-6 sm:text-[18px] sm:leading-[26px] md:text-[19px] md:leading-7 lg:text-[21px] lg:leading-8 font-sans">
          Excellent
        </span>
        <FiveStars
          aria-hidden
          className="h-[15px] sm:h-[16px] md:h-[18px] lg:h-[24px]"
        />
        <div className="flex items-end gap-0">
          <SingleStar
            aria-hidden
            className="block h-[15px] w-[15px] sm:h-[16px] sm:w-[16px] md:h-[18px] md:w-[18px] lg:h-auto lg:w-auto"
          />
          <TrustpilotWordmark
            aria-hidden
            className="block h-[10px] sm:h-[11px] md:h-[12px] lg:h-auto -mb-[2px]"
          />
        </div>
      </div>
    </Container>
  );
}
