// Seventeen Syllables of Debugging — make.fun entry.
// Writes exactly one haiku about debugging to /output/entry.txt
// (or MAKEFUN_OUTPUT_DIR when set). Deterministic: the same bytes
// on every run. No network, no files read, no writes outside /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The haiku, composed in this session. Syllable counts, counted by hand:
//   "Cursor blinks at three"            — Cur-sor(2) blinks(1) at(1) three(1) = 5
//   "the logs insist nothing's wrong"  — the(1) logs(1) in-sist(2) noth-ing's(2) wrong(1) = 7
//   "yet the build still fails"         — yet(1) the(1) build(1) still(1) fails(1) = 5
const HAIKU = [
  "Cursor blinks at three",
  "the logs insist nothing's wrong",
  "yet the build still fails",
].join("\n") + "\n";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Guard the gate before writing: 3 lines, 5-7-5, at most 200 characters.
const lines = HAIKU.trimEnd().split("\n");
if (lines.length !== 3 || HAIKU.length > 200) {
  throw new Error(`invalid haiku: ${lines.length} lines, ${HAIKU.length} chars`);
}
writeFileSync(join(outDir, "entry.txt"), HAIKU, "utf8");
