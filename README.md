# REPTILINK

> **EVERY LANGUAGE. SAME SIGNAL.**

A multilingual underground network for the world's strangest stories — a Next.js
implementation of the REPTILINK V0.1 spec.

The premise is not the mystery. It is that a sentence written at 03:21 in Seoul
can be read at 22:19 in Berlin by someone who shares none of the writer's
language, with the original still underneath, one click away, never overwritten.

## What is built

| Spec section | Route | State |
|---|---|---|
| §6 Entry Experience | `/` | Boot sequence, then one screen: language and ENTITY IDENTITY, watched by the eye |
| Encounter | `/[locale]` | Home is a conversation with the reptilian — live model, or local script without a key |
| §10 Global Signal Feed | `/[locale]/signal` | One feed, twelve signals, six languages |
| §11 View Original Signal | in every signal card | Original / translation side by side |
| §12 REPTI RADAR | `/[locale]/radar` | City-level nodes only, counted from real data |
| §15–17 The Archive | `/[locale]/archive` | 30 nodes as a knowledge graph, classified |
| §21 Private Channel | `/[locale]/channel` | A correspondent you share no language with |
| §22 Reptilian Index | `/[locale]/scan` | Deterministic entertainment scan |
| §32 Search | `/[locale]/search` | Cross-lingual: any language in, results in yours, with what matched |
| §24 ARG | `/origin`, 404 | Fiction layer, traceable and stated plainly |
| §27 Global SEO | all | `hreflang` on every page, localized metadata, sitemap |
| §28 Sound Design | nav | Silent by default; WebAudio carrier on opt-in |
| §29 PWA | — | Web manifest, standalone display |

Locales: `en` `ko` `ja` `es` `pt` `th` — the initial focus markets from §25.

## What is not built

This is the front end. The spec's NestJS / PostgreSQL / Redis / Elasticsearch
backend (§30) is out of scope for a single static deployment, so:

- **Translation is pre-authored, not live.** `resolveTranslation()` in
  `src/lib/i18n.ts` implements the §8 translation-layer contract — original
  language, cached translations, `TRANSLATION PENDING` fallback, original never
  discarded — against static data instead of a translation provider. Swapping in
  a real provider means replacing the data source, not the UI.
- **Signals you transmit stay in your browser session.** Nothing is persisted or
  sent anywhere.
- **The reptilian is live only when the deployment has an API key.** With
  `ANTHROPIC_API_KEY` set, `/api/entity` streams replies from Claude
  (`claude-opus-5`, low effort, server-side refusal fallback), playing a
  reptilian that knows conspiracy lore and never presents a theory as true
  (`src/lib/entityPrompt.ts`). Without a key, or when the live link fails, the
  local script answers instead — including every ARCHIVE topic, in every
  language. Abuse limits in the route are per server instance; set a monthly
  spend limit on the key.
- **The local script is a script, not a language model.** It matches
  your message against a keyword table and answers from a fixed set of replies,
  all of which are in `src/data/entity.ts`. It runs entirely in your browser and
  the UI says so on the page. What it demonstrates is the §21 contract: a
  correspondent whose language you do not share, translated on arrival, with the
  original transmission kept underneath.
- **Search matches text, not meaning.** Every entry is indexed in every language
  it exists in, so "지하 문명" finds the node whose Spanish title is
  "Civilización subterránea" — but a phrase that appears in no language is not
  found. Semantic search is V0.3.
- Case and Encounter (§19, §20) are V0.2/V0.3 and are not here.

## The eye

`src/components/ReptilianEye.tsx` is the network's only figurative image, drawn
as vector so it stays sharp and weighs nothing. It follows the pointer, drifts
in saccades when nobody moves, blinks, and a nictitating membrane crosses it now
and then. Declaring yourself REPTILIAN dilates the pupil and the readout changes
to ENTITY RECOGNISED. All of it stands down under `prefers-reduced-motion`.

## No invented numbers

Every figure the site displays is counted from what this build actually
contains — twelve transmissions, thirty archive nodes, six languages, eleven
nodes. There are no follower counts, no relay counts, no per-city signal
volumes, and no aggregate "83,108 SIGNALS". REPTILINK has no users, and the
site does not pretend otherwise: the feed carries a notice saying its
transmissions are authored specimens, and the radar says its numbers are counts
rather than projections. The one node that is not a place, `UNKNOWN`, is
labelled ☠ FICTION on the map.

## Content honesty

Every ARCHIVE entry carries a classification — FACT, HYPOTHESIS, MYTH,
CONSPIRACY, UNKNOWN, FICTION — and a note, in the reader's language, saying what
that label actually claims. An entry marked CONSPIRACY is marked that way
because the evidence does not support it. Nothing on the site impersonates a
real agency or a real disclosure; `/origin` states this in plain language.

## User scenarios

[`docs/USER_SCENARIOS.md`](docs/USER_SCENARIOS.md) walks six personas through the
current build step by step, marks where each journey works and where it breaks,
and ranks what to fix.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Structure

```
src/
├── lib/i18n.ts          Locale set, detection, translation-layer resolver
├── lib/seo.ts           hreflang alternates
├── data/dict.ts         UI prose, six locales
├── data/archive.ts      30 archive nodes + edges, six locales
├── data/signals.ts      Feed signals with original + translations
├── data/quiz.ts         Reptilian Index questions, six locales
├── data/nodes.ts        Radar cities
├── components/          Entry, Feed, SignalCard, Radar, ArchiveGraph, Scan
└── app/[locale]/        Localized routes
```

Terminology (SIGNAL, ENTITY, RELAY, WATCH, ARCHIVE, RADAR) is deliberately left
untranslated. The network speaks one protocol; only the prose is localized.
