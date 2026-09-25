import assert from "node:assert/strict"
import { test } from "node:test"
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

import { parseFrontMatter, tar } from "./build.mjs"

test("front matter: nested maps, quotes and colons inside values", () => {
  const front = parseFrontMatter(`---
version: alpha
name: Example
colors:
  primary: "#FF385C"
components:
  card:
    boxShadow: rgba(0, 0, 0, 0.08) 0px 1px 2px 0px
dark:
  colors:
    ink: "#EDEDED"
---
# Body`)
  assert.equal(front.name, "Example")
  assert.equal(front.colors.primary, "#FF385C")
  assert.equal(front.components.card.boxShadow, "rgba(0, 0, 0, 0.08) 0px 1px 2px 0px")
  assert.equal(front.dark.colors.ink, "#EDEDED")
})

test("front matter: none is null, not an empty object", () => {
  assert.equal(parseFrontMatter("# Just markdown"), null)
})

test("tar: the system's tar reads what we write, long paths included", () => {
  const long = `src/${"deeply/".repeat(16)}nested.txt`
  const bytes = tar([
    { name: "a.txt", bytes: Buffer.from("hello") },
    { name: long, bytes: Buffer.from("deep") },
  ])
  const dir = mkdtempSync(path.join(tmpdir(), "mp-"))
  const file = path.join(dir, "x.tar")
  writeFileSync(file, bytes)
  execFileSync("tar", ["-xf", file, "-C", dir])
  assert.equal(readFileSync(path.join(dir, "a.txt"), "utf8"), "hello")
  assert.equal(readFileSync(path.join(dir, long), "utf8"), "deep")
})

test("tar: deterministic — same files, same bytes", () => {
  const files = [{ name: "a", bytes: Buffer.from("1") }]
  assert.deepEqual(tar(files), tar(files))
})
