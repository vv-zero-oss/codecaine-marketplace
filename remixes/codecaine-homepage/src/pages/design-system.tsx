import { AppShell } from "@/components/site/sections/app-shell";
import { ComponentGallery } from "@/components/site/sections/component-gallery";
import { Foundations } from "@/components/site/sections/foundations";
import { Hero } from "@/components/site/sections/hero";

export function DesignSystemPage() {
  return (
    <main className="container-page pb-24" data-canvas-ignore>
      <Hero />
      <Foundations />
      <ComponentGallery />
      <AppShell />
    </main>
  );
}
