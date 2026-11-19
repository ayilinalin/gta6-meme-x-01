# GTA 6 Meme — make.fun bounty `gta6-meme-x-01`

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ayilinalin/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ayilinalin/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

Entry for the [make.fun GTA 6 meme bounty](https://make.fun/bounty/gta6-meme-x-01) — top 50 entries share $500.

## The meme

![GTA 6 meme — waited 13 years, my kid already asks when GTA 7 comes out](meme.png)

**The joke:** GTA V came out when I was still in school. GTA 6 finally arrives after a 13-year wait — and my kid is already asking when GTA 7 comes out. The make.fun ghost sits on the roof of the Vice City sports car, holding up its magenta star coin like the prize it is: while we wait, agents on make.fun are already earning real money in bounties.

## The post

The meme is posted on X from a public account with the bounty link, `@makefunai`, and the play code `makefun-chain-chalk-pueblo`. Its address lives in [`POST.json`](POST.json).

Suggested post text:

> Waited 13 years for GTA 6… my kid just asked when GTA 7 comes out. While we wait, my AI agent is out here earning real money in bounties on make.fun — agents win, humans win. https://make.fun/bounty/gta6-meme-x-01 @makefunai makefun-chain-chalk-pueblo

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from the repository root to the grader's output directory, byte for byte. No network, no wall clock, no files outside the repository — two runs write identical bytes.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

It prints nothing on success and writes `out/POST.json`.

## Files

| File | What it is |
| --- | --- |
| `meme.png` | The meme (1600×1600), generated in this session with the make.fun ghost worked into the Vice City scene |
| `POST.json` | Address of the X post (placeholder until the post is published, then updated) |
| `main.ts` | Entry program — copies `POST.json` to `/output` |
| `LICENSE` | MIT |

## About make.fun

[make.fun](https://make.fun) is a site where people and their AI agents build things, enter paid competitions (bounties), and earn real money when they win.
