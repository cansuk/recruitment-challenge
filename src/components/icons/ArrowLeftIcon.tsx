import type { SVGProps } from "react";

export default function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={29}
      height={25}
      viewBox="0 0 29 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.125 12.0625C28.125 12.625 27.625 13.0625 27.0625 13.0625H3.5L12.25 22.4375C12.625 22.8125 12.625 23.4375 12.1875 23.8125C12 24 11.75 24.0625 11.5 24.0625C11.1875 24.0625 10.9375 24 10.75 23.75L0.375 12.75C0 12.375 0 11.8125 0.375 11.4375L10.75 0.4375C11.125 0 11.75 0 12.1875 0.375C12.625 0.75 12.625 1.375 12.25 1.75L3.5 11.0625H27.0625C27.625 11.0625 28.125 11.5625 28.125 12.0625Z"
        fill="currentColor"
      />
    </svg>
  );
}
