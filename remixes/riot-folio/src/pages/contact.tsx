import { EmailCopy } from "@/components/sections/email-copy"
import { PageIntro } from "@/components/sections/page-intro"
import { Container } from "@/components/ui/container"
import { CONTACT } from "@/content"

/** One way in: an address you can click or copy. */
export function ContactPage() {
  return (
    <Container size="narrow" className="min-h-[60svh] pt-16 sm:pt-28">
      <PageIntro title={CONTACT.title} lede={CONTACT.body}>
        <EmailCopy className="mt-8" />
      </PageIntro>
    </Container>
  )
}
