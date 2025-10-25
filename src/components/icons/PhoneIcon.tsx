import type { SVGProps } from "react";

export default function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={11}
      height={16}
      viewBox="0 0 11 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.5 0C10.3125 0 11 0.6875 11 1.5V14.5C11 15.3438 10.3125 16 9.5 16H1.5C0.65625 16 0 15.3438 0 14.5V1.5C0 0.6875 0.65625 0 1.5 0H9.5ZM5.5 14.5C6.03125 14.5 6.5 14.0625 6.5 13.5C6.5 12.9688 6.03125 12.5 5.5 12.5C4.9375 12.5 4.5 12.9688 4.5 13.5C4.5 14.0625 4.9375 14.5 5.5 14.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
