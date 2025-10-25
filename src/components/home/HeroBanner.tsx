import Image from "next/image";
import Container from "@/components/layout/Container";

export default function HeroBanner({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full aspect-[1280/602] min-h-[500px] md:min-h-[500px]">
      <Image
        src="/images/hero-banner.png"
        alt="Hero banner"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {children ? (
        <div className="absolute inset-0 pointer-events-none">
          <Container className="h-full px-4">
            <div className="pointer-events-auto h-full">{children}</div>
          </Container>
        </div>
      ) : null}
    </div>
  );
}
