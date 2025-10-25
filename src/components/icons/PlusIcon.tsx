import type { SVGProps } from "react";

export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M14.5 10C14.5 10.5625 14.0312 11.0312 13.5 11.0312H9V15.5312C9 16.0625 8.53125 16.5 8 16.5C7.4375 16.5 7 16.0625 7 15.5312V11.0312H2.5C1.9375 11.0312 1.5 10.5625 1.5 10C1.5 9.46875 1.9375 9.03125 2.5 9.03125H7V4.53125C7 3.96875 7.4375 3.5 8 3.5C8.53125 3.5 9 3.96875 9 4.53125V9.03125H13.5C14.0312 9 14.5 9.46875 14.5 10Z"
        fill="currentColor"
      />
    </svg>
  );
}
