import type { SVGProps } from "react";

export default function EmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={12}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 9C8.5 9 9.03125 8.84375 9.46875 8.5L16 3.4375V10.5C16 11.3438 15.3125 12 14.5 12H1.5C0.65625 12 0 11.3438 0 10.5V3.4375L6.5 8.5C6.9375 8.84375 7.46875 9 8 9ZM0.5 2.5625C0.1875 2.3125 0 1.90625 0 1.5C0 0.6875 0.65625 0 1.5 0H14.5C15.3125 0 16 0.6875 16 1.5C16 1.90625 15.7812 2.3125 15.4688 2.5625L8.84375 7.71875C8.34375 8.09375 7.625 8.09375 7.125 7.71875L0.5 2.5625Z"
        fill="currentColor"
      />
    </svg>
  );
}
