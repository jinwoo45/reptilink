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
| §6 Entry Experience | `/` | Boot sequence, browser language detection, ENTITY IDENTITY |
| §10 Global Signal Feed | `/[locale]/signal` | One feed, twelve signals, six languages |
| §11 View Original Signal | in every signal card | Original / translation side by side |
| §12 REPTI RADAR | `/[locale]/radar` | City-level nodes only, no individual positions |
| §15–17 The Archive | `/[locale]/archive` | 30 nodes as a knowledge graph, classified |
| §22 Reptilian Index | `/[locale]/scan` | Deterministic entertainment scan |
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
- Private Channel, Case, Encounter and cross-lingual search (§19–21, §32) are
  V0.2/V0.3 and are not here.

## Content honesty

Every ARCHIVE entry carries a classification — FACT, HYPOTHESIS, MYTH,
CONSPIRACY, UNKNOWN, FICTION — and a note, in the reader's language, saying what
that label actually claims. An entry marked CONSPIRACY is marked that way
because the evidence does not support it. Nothing on the site impersonates a
real agency or a real disclosure; `/origin` states this in plain language.

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
