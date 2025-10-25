import type { SVGProps } from "react";

export default function SingleStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.8625 8.305H14.128L11.4392 0L8.73449 8.305L0 8.28908L7.06399 13.428L4.35928 21.733L11.4233 16.594L18.4873 21.733L15.7985 13.428L22.8625 8.305Z"
        fill="#00B67A"
      />
    </svg>
  );
}
