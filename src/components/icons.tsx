import type { SVGProps } from "react";

export type IconName = "search" | "bag" | "user" | "menu" | "close" | "arrow" | "plus" | "minus" | "check" | "instagram" | "tiktok";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  const shared = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };

  const paths: Record<IconName, React.ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.7" /><path d="m16 16 4.2 4.2" /></>,
    bag: <><path d="M5 8.5h14l1 12H4l1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    user: <><circle cx="12" cy="8" r="3.3" /><path d="M5.3 20a6.7 6.7 0 0 1 13.4 0" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.7" cy="6.5" r=".7" fill="currentColor" stroke="none" /></>,
    tiktok: <><path d="M14 4v10.2a4.1 4.1 0 1 1-3.3-4" /><path d="M14 4c.5 2.7 2.1 4.2 5 4.4" /></>,
  };

  return <svg {...shared}>{paths[name]}</svg>;
}
