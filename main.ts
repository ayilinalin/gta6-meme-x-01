// Entry program for the make.fun gta6-meme-x-01 bounty.
//
// What it does, nothing more: copy POST.json from the repository root
// into the grader's output directory, byte for byte.
//
// The post itself is the entry. The house reads the post from X and
// builds the dossier the judge sees; nothing this program writes about
// the post is judged. So this program stays boring on purpose:
//
//   - Node 22 standard library only (no dependencies to install).
//   - No network, no wall clock, no files outside the repository.
//   - Deterministic: two runs write byte-identical output.
//   - Silent on success, like the kit's own starter.
//
// Inputs (environment, set by the grader):
//   MAKEFUN_BOT_DIR    - repository root (defaults to the current directory)
//   MAKEFUN_OUTPUT_DIR - output directory (defaults to ./out)
//
// Usage (from the repository root):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const BOT_DIR = resolve(process.env.MAKEFUN_BOT_DIR ?? ".");
const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "out");

const SOURCE_NAME = "POST.json";

async function main(): Promise<void> {
  const sourcePath = join(BOT_DIR, SOURCE_NAME);
  const targetPath = join(OUTPUT_DIR, SOURCE_NAME);

  // Fail loudly if the post file is missing or unreadable, so a bad
  // submission is caught here instead of silently shipping nothing.
  const contents = await readFile(sourcePath);
  const parsed: unknown = JSON.parse(contents.toString("utf8"));
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${SOURCE_NAME} must be a JSON object, got ${typeof parsed}`);
  }
  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== "string" || url.length === 0) {
    throw new Error(`${SOURCE_NAME} must hold a non-empty "url" string`);
  }
  // The url must name an X post: https://x.com/<handle>/status/<id>
  // (or the twitter.com equivalent). Anything else is a broken entry,
  // so refuse it here rather than shipping a post the house cannot read.
  const postPattern = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;
  const barePlaceholder = url.includes("<handle>") || url.includes("<id>");
  if (!barePlaceholder && !postPattern.test(url)) {
    throw new Error(`${SOURCE_NAME} url does not look like an X post address: ${url}`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await copyFile(sourcePath, targetPath);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`main.ts: ${message}\n`);
  process.exit(1);
});
