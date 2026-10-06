
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { useResolvedTheme } from "@/hooks/use-theme"

/**
 * Sonner on the house surface.
 *
 * Two deviations from the shadcn original, both to stay on this system:
 *   · the theme comes from the `data-theme` hook, not next-themes — this repo
 *     has one theme mechanism and next-themes is not it;
 *   · the surface, shadow and radius are the raised-menu recipe, so a sonner
 *     toast and the house `.toast` read as the same object.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useResolvedTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--ui-surface-raised)",
          "--normal-text": "var(--ui-fg-strong)",
          "--normal-border": "transparent",
          "--border-radius": "var(--radius-xl)",
          "--toast-svg-margin-start": "0",
        } as React.CSSProperties
      }
      toastOptions={{
        style: { boxShadow: "var(--ui-shadow-menu)", border: "0" },
      }}
      {...props}
    />
  )
}

export { Toaster }
