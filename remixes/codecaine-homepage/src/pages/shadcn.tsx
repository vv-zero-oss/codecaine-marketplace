import { DisplayGallery } from "@/components/shadcn-gallery/display";
import { FormsGallery } from "@/components/shadcn-gallery/forms";
import { OverlaysGallery } from "@/components/shadcn-gallery/overlays";

export function ShadcnPage() {
  return (
    <main className="container-page pb-24" data-canvas-ignore>
      <section className="flex flex-col items-center pt-7 pb-4 text-center">
        <p className="type-eyebrow inline-flex items-center gap-1.5">
          shadcn/ui <span className="badge-soft">Bridged</span>
        </p>
        <h1 className="type-display mt-2.5">On our tokens</h1>
        <p className="type-lead mt-4 max-w-[520px]">
          Every component below is stock shadcn/ui. None of its colors, shadows, radii or fonts
          reach the page — <code className="type-code">src/shadcn.css</code> aliases each of its
          variable names onto a <code className="type-code">--ui-*</code> token, so the whole set
          retints with one attribute flip.
        </p>
      </section>

      <FormsGallery />
      <OverlaysGallery />
      <DisplayGallery />
    </main>
  );
}
