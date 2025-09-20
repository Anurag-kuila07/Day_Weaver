import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" />
      <path d="M4 12a8 8 0 0 0 8 8" />
      <path d="M12 4a8 8 0 0 1 8 8" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </svg>
  );
}
