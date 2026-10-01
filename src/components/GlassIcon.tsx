import { cn } from "@/lib/utils";

// Liquid Glass icons by Icons8 (https://icons8.com), self-hosted in public/icons.
// Free license: keep the Icons8 credit link in the site footer.
export type GlassIconName =
  | "box"
  | "calendar"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "cloud"
  | "console"
  | "down"
  | "email"
  | "external-link"
  | "github"
  | "linkedin"
  | "marker"
  | "medal"
  | "menu"
  | "monitor"
  | "moon"
  | "multiply"
  | "phone"
  | "server"
  | "sun"
  | "support"
  | "up";

interface GlassIconProps {
  name: GlassIconName;
  className?: string;
  // Sitting on a colored/gradient surface: keep the white glass in both themes
  onColor?: boolean;
}

const GlassIcon = ({ name, className, onColor = false }: GlassIconProps) => (
  <img
    src={`${import.meta.env.BASE_URL}icons/${name}.png`}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={cn(
      "inline-block h-5 w-5 shrink-0 select-none object-contain",
      // The icons are white glass; invert them to dark glass on the light theme
      !onColor && "invert dark:invert-0",
      className,
    )}
  />
);

export default GlassIcon;
