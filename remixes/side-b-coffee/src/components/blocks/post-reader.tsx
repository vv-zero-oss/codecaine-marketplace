import { useState } from "react"
import { Check, Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Post } from "@/content/site"
import { photo } from "@/lib/photos"
import { radio, useRadio } from "@/lib/radio"

/**
 * A board post, opened: the photo, the whole story, and the thing the
 * label promised — the rotation plays through the shop radio, a seat is
 * saved under the name you give.
 */
export function PostReader({ post, open, onOpenChange }: { post: Post; open: boolean; onOpenChange: (o: boolean) => void }) {
  const { playing } = useRadio()
  const [name, setName] = useState("")
  const [saved, setSaved] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] w-[min(760px,calc(100vw-24px))] max-w-none gap-0 overflow-y-auto rounded-(--radius-panel) border-0 bg-page p-0 shadow-(--shadow-lift) sm:max-w-none">
        <img src={photo(post.photo, 1400)} alt="" className="aspect-[16/8] w-full object-cover sm:rounded-t-(--radius-panel)" />
        <div className="space-y-5 p-6 sm:p-10">
          <p className="font-mono text-[12.5px] tracking-[0.08em] text-ink-3 uppercase">
            {post.kicker} · {post.date}
          </p>
          <DialogTitle className="type-display text-h2 font-semibold">{post.title}</DialogTitle>
          <DialogDescription className="text-lead text-ink-2">{post.excerpt}</DialogDescription>
          {post.body.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[60ch] text-[16px] text-ink-2">
              {p}
            </p>
          ))}
          {post.action === "listen" && (
            <Button variant="honey" onClick={() => radio.toggle()}>
              {playing ? <><Pause /> Pause the rotation</> : <><Play /> Play the rotation</>}
            </Button>
          )}
          {post.action === "rsvp" &&
            (saved ? (
              <p className="flex items-center gap-2 rounded-(--radius-field) bg-moss-soft px-4 py-3 text-[15px] text-moss">
                <Check className="size-4" /> You're on the list, {name.trim()}. See you Thursday at seven.
              </p>
            ) : (
              <form
                className="flex flex-col gap-2 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (name.trim()) setSaved(true)
                }}
              >
                <Input placeholder="Name for the list" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
                <Button type="submit" disabled={!name.trim()}>
                  Save a seat
                </Button>
              </form>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
