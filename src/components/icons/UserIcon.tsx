import type { SVGProps } from "react";

export default function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={19}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 10C5.78125 10 4 8.21875 4 6C4 3.8125 5.78125 2 8 2C10.1875 2 12 3.8125 12 6C12 8.21875 10.1875 10 8 10ZM9.5625 11.5C12.5625 11.5 15 13.9375 15 16.9375C15 17.5312 14.5 18 13.9062 18H2.0625C1.46875 18 1 17.5312 1 16.9375C1 13.9375 3.40625 11.5 6.40625 11.5H9.5625Z"
        fill="currentColor"
      />
    </svg>
  );
}
