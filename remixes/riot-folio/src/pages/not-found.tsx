import { PageIntro } from "@/components/sections/page-intro"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export function NotFoundPage() {
  return (
    <Container className="py-32">
      <PageIntro title="Nothing here." lede="That page moved, or never was. The work is still where it always is.">
        <ButtonLink href="/work" className="mt-8">
          See the work
        </ButtonLink>
      </PageIntro>
    </Container>
  )
}
