# Grok Genome — Development History

**Repository:** [smeagster86/grok-genome](https://github.com/smeagster86/grok-genome)  
**Default branch:** main  
**Current HEAD (as of document creation):** `7effc4346f70ff03266896a3be1166019dd45a04` (May 26, 2026) — "Fix build: Import MatchedInsight in app/page.tsx..."

> This document exists so that future Grok sessions (or human contributors) can read the complete story instead of losing critical context across conversation boundaries, context compactions, or hand-offs. It is the authoritative reference for the project's philosophy, guardrails, roadmap decisions, technical patterns, and hard-won build/deployment lessons.

---

## Executive Summary

Grok Genome is a **100% client-side, privacy-first Next.js 15 + TypeScript + Tailwind + Framer Motion** web application for exploring raw DNA data files (23andMe, MyHeritage, Ancestry, VCF, etc.). It provides curated SNP-level insights plus four rich synthesized profiles (Methylation Support, Drug Metabolism Tendencies, Nutrition & Metabolism Context, Sleep & Recovery Context) that strictly follow a probabilistic, humble, evidence-transparent framing.

The project began as an entirely different Windows automation tool for clinical note transfer and underwent an abrupt full pivot toward deeper, more thoughtful personal genomic analysis. It was then built through four deliberate phases (Evidence → Synthesis/Profiles → Trust Architecture → Beta Readiness) under extremely strict physician positioning guardrails. All genomic data never leaves the user's browser; only localStorage is used for non-genomic UI state (disclaimer dismissal + optional feedback). Exports (PDF, Markdown, JSON, CSV) carry the same humility language.

As of the final commit on May 26 2026, the site features consistent EvidenceBadge usage, deepened Phase 4 profiles with Why boxes + 5–7 nuanced limitations each, a dedicated `/for-clinicians` route, a global first-visit disclaimer banner, local-only feedback, improved PDF Report Overview + page-break logic, and a full cascade of production build fixes that resolved repeated Vercel deployment failures.

**Core non-negotiables (never compromised):** exact 5-question structure per profile, probabilistic language only ("tendency", "one data point among many", "not deterministic", "consult professionals"), client-only execution, EvidenceBadge transparency on ancestry bias and effect size, and GA4GH-inspired ethical framing.

---

## Project Origin & Pivots

### Timeline of Major Shifts

- **Very early conversation:** User requested a completely different project — a multi-agent local Windows automation system (mouse/scroll monitoring via PyAutoGUI/Selenium, safe RL agents) to copy clinical notes from the standalone Heidi AI scribe into Accuro EMR for 10 family physicians on a tight budget.
- User researched paid Accuro/QHR integration options.
- User explicitly directed: "please proceed with the scaffolding for the extension" (heidi-accuro-bridge folder was started locally with manifest.json, background.js, content scripts, popup, etc.).
- **Abrupt full pivot:** The conversation returned to the user's existing Grok Genome personal genomics explorer. The request was to make the analysis much more exhaustive, produce a much more detailed report, add export options, and develop the site to support thoughtful and genuinely useful personal perspective when analyzing one's own genetic data — seeking clearer insight rather than any commercial direction.

The pivot was total and immediate. All prior automation scaffolding was abandoned in favor of deepening the existing Grok Genome site as a tool for careful, humble, and personally meaningful exploration of genetic information.

**Key early directive (physician positioning document, provided verbatim by user):** 
> "Private genomic intelligence for the individual, not a diagnostic service."

This single sentence, together with the strict 5 core questions structure and heavy emphasis on probabilistic/humility language, became the immovable foundation for every subsequent decision.

---

## Core Philosophy & Guardrails

### Physician Positioning Principles (user-provided verbatim)

- Private genomic intelligence **for the individual**, not a diagnostic service.
- Strict 5 core questions structure for **every** synthesized profile.
- Heavy emphasis on probabilistic/humility language: "tendency", "one data point among many", "not deterministic", "multifactorial", "consult professionals".
- GA4GH and ethical framing.
- Explicit notes on ancestry bias (most GWAS European-biased).
- **No hype, no disease claims, no "you have X"**.
- Repeated reinforcement: "no deterministic language", exact 5Qs, "probabilistic and humble".

### The Exact 5 Core Questions (enforced in every profile)

1. What might this mean?
2. How strong is the evidence?
3. Clinically established or exploratory?
4. Meaningful effect on lifestyle or metabolism/recovery/etc.?
5. Actionable or worth discussing with a professional?

Every answer must be framed probabilistically, note ancestry limitations, and end with the reminder that findings are "one data point among many" and that users should "consult your physician or genetic counselor."

### Evidence Transparency Standard

All findings surface:
- Evidence level / strength
- Effect size
- Ancestry considerations ("European-biased" etc.)
- Clinical status ("Exploratory", "Established for specific pairs", etc.)

This is implemented via the reusable `EvidenceBadge` component (multi-part labels such as "Moderate Evidence • Modest Influence • European-biased • Exploratory") plus a consistent legend.

---

## Approved Roadmap

User explicitly approved the following phased plan (verbatim): "Yes sounds really good... do b a and c... do them all... in that order please"

**a) Evidence & transparency first**
- `EvidenceBadge` component with multi-part labels.
- Legend.
- Consistent use across SNP table + all profiles.
- Knowledge base expansion with `evidenceLevel`, `references`, `clinicalActionability`, `notes`, `evidenceStrength`, `effectSize`, `ancestryNote`, `clinicalStatus`, `knowledgeBaseVersion`.

**b) Synthesis & depth**
- Four rich profiles using the **exact** 5Qs.
- "Why This Profile Matters" boxes.
- Progressive disclosure ("Show detailed SNPs").
- Richer limitations/details with genotype context + ancestry caveats.

**c) Trust Architecture**
- Dedicated `/for-clinicians` route.
- Expanded `OurApproach.tsx` (4 commitments + detailed privacy hero + For Clinicians CTA).
- Global `FirstVisitDisclaimer` banner (localStorage, calm guardrails).
- Trust links everywhere (nav, footer, profile footers).
- Export improvements that carry humility language and synthesized profiles.

**Subsequent beta readiness polish** (user: "complete the Beta Readiness items... final pre-beta polish... upgrade all four... Improve the PDF... Add a short Report Overview") included:
- KB v4 sleep SNPs (PER2 rs934945, MTNR1B rs10830963 + enhanced CLOCK) with full metadata.
- All 4 profiles upgraded to richer Phase 4 content.
- PDF: Report Overview summary + stricter page-break logic.
- exportUtils updated for richer Markdown.
- Feedback modal (localStorage only, no genomic data stored).
- Mobile/a11y polish on sub-selectors.

---

## Detailed Chronological Timeline

All dates below are May 26, 2026 (compressed intense development day). Commits are listed in reverse chronological order (newest first) with exact messages from the repository.

| Commit SHA (short) | Message (verbatim) | Phase / Context |
|--------------------|--------------------|-----------------|
| `7effc4346f70ff03` | Fix build: Import MatchedInsight in app/page.tsx so the cast in the Quick Overview section compiles. | Final build fix (after TS indexing cast) |
| `f72d8244bf66088e` | Fix TypeScript indexing error in page.tsx:350 for result.categories[cat] by adding explicit type and safe cast. | Build war story — repeated Vercel failures |
| `bd744059373629e3` | Fix build: Replace remaining <a> with Next.js <Link> for internal routes in page.tsx (nav + footer/trust links) to satisfy ESLint no-html-link-for-pages rule. | Build war story — <a> vs <Link> cascade (page.tsx) |
| `bb756a72eae2f0f1` | Fix build: Replace <a> with Next.js <Link> for internal nav in SleepRecoveryContext profile... | Build war story |
| `c37901f0acaeca01` | Fix build: Replace <a> with Next.js <Link> for internal nav in NutritionMetabolismContext profile... | Build war story |
| `f7eacd6f93877b0c` | Fix build: Replace <a> with Next.js <Link> for internal nav in MethylationSupport profile... | Build war story |
| `cee41307cec17d25` | Fix build: Replace <a> with Next.js <Link> for internal nav in Drug profile + escape inner quotes... | Build war story (last of the <a> fixes + quote escaping) |
| `a646483fea7356bc` | Pre-beta: Update export markdown helper with richer Phase 4 profile text (Why boxes, deeper 5Qs, expanded limitations) so Markdown exports match the upgraded UI depth | Export improvements (Phase 3/4) |
| `29aec51d69cab231` | Pre-beta: Add Report Overview summary at top of Full Report PDF + improve spacing/headings for richer profile content and better page-break handling | PDF Report Overview + page-breaks |
| `e2ea4c9355a44e95` | Pre-beta polish: Richer SleepRecoveryContext — Why box, genotype-aware summary using new SNPs, deepened 5Qs, richer details panel, 6 limitations, consistent footer | Phase 4: Sleep profile upgrade (user provided exact sample copy) |
| `3bd683413bbb4c4b` | Pre-beta polish: Richer NutritionMetabolismContext — Why box, genotype-referenced summary, deepened 5Qs with ancestry nuance, richer details panel, 6 limitations, consistent footer | Phase 4: Nutrition profile upgrade |
| `7436d72352d5c780` | Pre-beta polish: Richer DrugMetabolismTendencies — Why box, genotype-aware summary, deepened 5Qs with coverage caveats, richer details, 5 nuanced limitations, consistent footer | Phase 4: Drug profile upgrade |
| `1ecbd984661333e5` | Pre-beta polish: Richer MethylationSupport profile — expanded summary with genotype context, deepened 5Qs, 6 nuanced limitations, richer details panel with mini evidence notes, new Why This Profile Matters box, consistent trust footer | Phase 4: Methylation profile upgrade (first of the four) |
| `f5ff9aaa00297590` | Beta readiness: Add unobtrusive local-only 'Share feedback' button + modal in footer (saves suggestions to localStorage only). Final mobile/a11y polish on sub-selector (min touch height, focus-visible, ARIA). | Beta readiness: feedback + a11y |
| `b2629568bec844ec` | Beta readiness: Tighten PDF page-break logic (stricter checks before categories, profiles, long text blocks, and references) for cleaner multi-profile reports with better margins. | Beta readiness: PDF quality |
| `016c762a55e1381a` | Beta readiness: Add 2-3 high-quality sleep/circadian SNPs (PER2 rs934945 + MTNR1B rs10830963, plus enhanced CLOCK) with full evidence/ancestry metadata for the SleepRecovery profile and future use. Updated version string. | Beta readiness: KB v4 sleep SNPs (user-requested) |
| `f0c8e6875f23b4fc` | Phase 4 / polish: Wire SleepRecoveryContext into imports + profileFilter + sub-selector (with mobile improvements) + conditional render. Add prominent 'Export Full Report' button... | Phase 4 integration + prominent export |
| `e7c08e8012a7ab96` | Phase 4 / polish: Add new lightweight SleepRecoveryContext profile component using exact structure and provided clinical copy | Phase 4: New Sleep profile component (user provided copy) |
| `9999d72e53e0eb80` | Phase 3: Enhance PDF exports to include synthesized profiles section (5Qs + Limitations) + stronger disclaimers and Trust link. | Phase 3: Export + PDF trust language |
| `ba5336540ded7b52` | Phase 3: Improve exports — Markdown (and structured report) now include full synthesized profiles (5Qs summaries + Limitations panels) + reinforced disclaimers. | Phase 3: exportUtils richer profiles |
| ... (earlier Phase 3 commits for /for-clinicians route, OurApproach expansion, FirstVisitDisclaimer, trust links in profiles) | ... | Phase 3: Trust Architecture |
| ... (Phase 2 commits) | MethylationSupport first (MTHFR 677/1298, exact 5Qs + Why + toggles), then DrugMetabolismTendencies, NutritionMetabolismContext, finally SleepRecoveryContext | Phase 2: Synthesis & depth (4 profiles) |
| ... (Phase 1 commits) | EvidenceBadge component created + made consistent everywhere. KB expanded with professional metadata fields. | Phase 1: Evidence & transparency |

**Build war stories (repeated full context loss & recovery):** 
- Multiple instances of `app/page.tsx` becoming corrupted during large edits (file reduced to partial imports, wrong SHAs, 15–167 bytes). Complete restores were performed using fresh `get_file_contents` SHAs from the repository.
- Repeated Vercel build failures on every deployment wave: SupportModal prop mismatch, missing imports, knowledgeBaseVersion, `<a>` vs `<Link>` (ESLint `no-html-link-for-pages`), unescaped quotes in JSX, TypeScript indexing errors on `result.categories[cat]` (required explicit `Record<Category, MatchedInsight[]>` casts), "Cannot find name 'MatchedInsight'".
- User pasted full old v3 Markdown/PDF reports (missing rich profiles) and made explicit deployment check requests ("Just want you to check the deployment side... yes first").
- Strict adherence to user's repeated "show me the full updated code" requests after every major change.

---

## Technical Architecture & Patterns

### Non-Negotiable Technical Constraints (always respected)
- **100% client-side Next.js 15 + TypeScript + Tailwind + Framer Motion.** Zero backend, zero server-side genomic processing.
- Static bundled knowledge base only (`lib/knowledgeBase.ts`).
- Pure export functions only: `toStructuredReport`, `toJSON`, `toCSV`, `toMarkdown`, `prepareRichPDFData`, `generatePDFReport` (jsPDF).
- Parsers for 23andMe / MyHeritage / Ancestry / VCF / TSV / zip + `DEMO_DATASETS`.
- **`<Link>` (not `<a>`) for all internal SPA navigation** (ESLint `no-html-link-for-pages` rule — source of multiple production build failures).
- **localStorage only** for disclaimer state and feedback (never genomic data).
- Reusable components: `EvidenceBadge` + `EvidenceLegend`, `ProfileSelector`, `CategoryCard`, `SNPTable`, `SupportModal`, `FirstVisitDisclaimer`, `OurApproach`.

### Current Navigation & Major Routes (from `app/page.tsx` and `app/for-clinicians/page.tsx`)

```tsx
// app/page.tsx (key excerpts, current as of 7effc434...)
import Link from "next/link";
// ...
<nav>...
  <Link href="/#our-approach">Our Approach</Link>
  <Link href="/for-clinicians">For Clinicians</Link>
  ...
</nav>

<FirstVisitDisclaimer />

// Profile wiring
<ProfileSelector ... />
{profileFilter === 'methylation' && <MethylationSupport insights={...} />}
{profileFilter === 'drug' && <DrugMetabolismTendencies ... />}
{profileFilter === 'nutrition' && <NutritionMetabolismContext ... />}
{profileFilter === 'sleep' && <SleepRecoveryContext ... />}

// Quick Overview (post-fix cast)
{(result.categories as Record<Category, MatchedInsight[]>)[cat].length}

// Exports
<button onClick={handleExportFullReport}>Export Full Report</button>
<button onClick={handleExportMarkdown}>Markdown</button>
// ... JSON, CSV, PDF

// Feedback (localStorage only)
const submitFeedback = () => {
  const existing = JSON.parse(localStorage.getItem('grok-genome-feedback') || '[]');
  existing.push({ ts: new Date().toISOString(), text: feedbackText.trim() });
  localStorage.setItem('grok-genome-feedback', JSON.stringify(existing.slice(-20)));
};
```

### Profile Structure (representative — SleepRecoveryContext.tsx and MethylationSupport.tsx)

Every profile follows this exact pattern (enforced across all four):

```tsx
<EvidenceBadge level="Moderate Evidence" effect="Modest Influence" ancestry="European-biased" status="Exploratory" />

{/* Why This Profile Matters */}
<div className="... bg-emerald-500/5 ...">
  <div>Why This Profile Matters</div>
  <p>...</p>
</div>

{/* Genotype-aware summary */}
<p>Your data shows the GG genotype at MTHFR rs1801133 ... or "no strong CLOCK signal" ...</p>

{/* Exact 5Qs (probabilistic language) */}
1. What might this mean? — ...
2. How strong is the evidence? — ...
3. Clinically established or exploratory? — ...
4. Meaningful effect...? — ...
5. Actionable or worth discussing...? — ...

{/* Progressive disclosure */}
<button onClick={() => setShowDetails(!showDetails)}>
  {showDetails ? "Simple view" : "Show detailed SNPs"}
</button>

{/* Detailed SNPs panel with mini evidence notes */}
<div className="...">
  <div className="font-mono text-emerald-400">CLOCK rs1801260 / rs2305160</div>
  ...
  <div className="mt-1 text-[10px] text-white/50">Evidence: Moderate • Population-specific • Small effect</div>
</div>

{/* Limitations (5–7 nuanced items) */}
<ul className="... list-disc pl-4">
  <li>Most data comes from European-ancestry populations...</li>
  ...
</ul>

{/* Consistent trust footer */}
<Link href="/#our-approach">Our Approach</Link> · <Link href="/for-clinicians">For Clinicians guidance</Link>

<div className="... text-[10px] text-white/40">
  One data point among many. Always interpret alongside clinical information and professional guidance.
</div>
```

### Knowledge Base SNP Example (Sleep Genes — full professional fields)

```ts
// lib/knowledgeBase.ts (excerpt, current as of 7effc434...)
{
  rsid: "rs934945", gene: "PER2", trait: "Circadian Chronotype",
  // ...
  evidenceLevel: "moderate",
  references: ["..."],
  clinicalActionability: "low",
  evidenceStrength: "Moderate GWAS",
  effectSize: "Small Effect",
  ancestryNote: "European-biased",
  clinicalStatus: "Exploratory",
  // plus all older fields: populationFrequency, source, notes, etc.
}
```

### Export Architecture

- `exportUtils.ts`: `toMarkdown` calls `getSynthesizedProfilesMarkdown(result.insights)` (rich Phase 4 text with Why boxes, 5Qs summaries, Limitations). `prepareRichPDFData` feeds the PDF generator.
- `pdfExport.ts`: `generatePDFReport` includes "Report Overview" summary at top of Full Report (added in pre-beta commit), stricter page-break logic before categories/profiles/long blocks/references, synthesized profiles section, and reinforced disclaimers.
- All exports carry the core disclaimer and humility language.

### EvidenceBadge Implementation (EvidenceBadge.tsx)

Multi-part labels with tooltip descriptions. Config-driven colors for high/moderate/preliminary/research. `EvidenceLegend` documents the standard phrases used everywhere.

---

## Build, Deployment & Maintenance Notes (War Stories)

**Repeated full page.tsx corruption during large edits:** The main `app/page.tsx` file was repeatedly reduced to partial imports or tiny byte counts (15–167 bytes) while editing large sections. Recovery required fresh `get_file_contents` calls using known-good SHAs from the remote repository.

**Vercel build failures on every deployment wave (May 26 2026):**
- SupportModal prop mismatches
- Missing imports (e.g., knowledgeBaseVersion)
- `<a>` vs `<Link>` (ESLint `no-html-link-for-pages` rule) — required fixes in 5 files (page.tsx + all 4 profile components)
- Unescaped quotes in JSX
- TypeScript indexing errors: `result.categories[cat]` required explicit `Record<Category, MatchedInsight[]>` casts
- "Cannot find name 'MatchedInsight'" — final import fix in the last commit (`7effc434...`)

**User process:** Explicit requests for full updated code after every major change + dedicated "check the deployment side" steps before continuing.

**Current discipline:** All internal navigation uses Next.js `<Link>`. Type casts are explicit. No genomic data ever touches localStorage or network.

---

## Key Files & Current State Snapshot (as of HEAD 7effc4346f70ff03266896a3be1166019dd45a04)

| Path | Purpose | Recent SHA (full or short) |
|------|---------|----------------------------|
| `app/page.tsx` | Main SPA: upload, analysis, all 4 profiles wired, exports, feedback, nav | `e6274c955800ead343e33863ef1878dbf22b365a` |
| `lib/knowledgeBase.ts` | Static curated SNPs (~80) with full professional metadata | `23af5773d820ae5c858a2357128380fa3e254000` |
| `lib/exportUtils.ts` | toJSON/toCSV/toMarkdown + richer Phase 4 synthesized profiles + prepareRichPDFData | `ef803710be6ff9dd84eed251fd8be68002be0f53` |
| `lib/pdfExport.ts` | jsPDF generator with Report Overview + strict page-breaks | `8c153263f1e0cf389a58fd7dda8e8b455bc1ee43` |
| `components/profiles/MethylationSupport.tsx` | Rich Phase 4 profile (MTHFR 677/1298) | `9738fd00afc02964d036daa382a60bd1b673880b` |
| `components/profiles/DrugMetabolismTendencies.tsx` | Rich Phase 4 profile | `ce3922ce4aaefe9c5fead17ec492de9fca3041a6` |
| `components/profiles/NutritionMetabolismContext.tsx` | Rich Phase 4 profile (ancestry nuance) | `4599b4f0b22fd9663167c3cc6ac6a9e2169e9509` |
| `components/profiles/SleepRecoveryContext.tsx` | Rich Phase 4 profile (new sleep SNPs) | `1f00f7dea940a2bb450e4bbb9a1744f3000f523b` |
| `components/EvidenceBadge.tsx` | Reusable multi-part evidence labels + legend | `c43c04536143dd33904f9ab365918c2624eb4d91` |
| `components/OurApproach.tsx` | 4 commitments + privacy hero + For Clinicians CTA | `cd272c0e2b0ba51275d34462bf4ac8ff3c3ba019` |
| `components/FirstVisitDisclaimer.tsx` | Global localStorage banner with guardrails | `adfc31e74363236bcd38f06d52e3d13f6fcce5f5` |
| `components/ProfileSelector.tsx` | View mode + profile sub-selector | `1041dd0ae59322638d9b2ac2453b256d33b362cb` |
| `app/for-clinicians/page.tsx` | Dedicated clinician guidance route | `22ac4b0ae09a5ce02ea1c6407b58f6c895285adb` |
| `lib/parsers.ts` | Raw file parsers + DEMO_DATASETS | `02b9cd8b414cbb3dbdc7587363cb2127eb96d169` |
| `lib/types.ts` | Core TypeScript interfaces (AnalysisResult, MatchedInsight, etc.) | `d23c5106982113dabae5afc8711f0d511e15e2b0` |

**Additional important files:** `app/layout.tsx`, `app/globals.css`, `components/SNPTable.tsx`, `components/CategoryCard.tsx`, `components/DNAHelix.tsx`, `components/SupportModal.tsx`.

---

## How to Use This Document (for future AI sessions and contributors)

1. Read the **Executive Summary** + **Core Philosophy & Guardrails** first (5–10 minutes). This gives the non-negotiables.
2. Read **Approved Roadmap** and **Detailed Chronological Timeline** to understand the deliberate phase order and why certain build pain occurred.
3. Use **Technical Architecture & Patterns** + code snippets as the single source of truth for current implementation style (especially the 5Qs template, EvidenceBadge usage, Link discipline, and localStorage-only rule).
4. Consult **Key Files** table + SHAs before making edits — always fetch fresh content via tools rather than relying on stale memory.
5. Before any large change, re-read the physician positioning principles and the exact 5Qs. They are the project's constitution.

Never introduce deterministic language. Never store genomic data client-side. Never bypass the EvidenceBadge or Limitations sections. When in doubt, quote this document.

---

## Appendix: Selected Verbatim User Directives & Tone

- "Phase 3 looks good — let's move into Phase 3: Trust Architecture..."
- "Great work — we now have four strong profiles... complete the Beta Readiness items..."
- "final pre-beta polish... upgrade all four... Specific Improvements... Show me the full updated code... Improve the PDF... Add a short Report Overview"
- "Private genomic intelligence for the individual, not a diagnostic service."
- Repeated emphasis on humility, no hype, exact 5Qs, probabilistic language, privacy (client-only, localStorage only).
- Final explicit request that produced this document: "Could you spawn a document curator and make a document that you can refer to if you need to on the github that collects in detail our discussions along way in the development of this site we are making"

---

## Footer

**Document created:** May 27, 2026 (PT) by Grok Document Curator subagent per explicit user request.  
**Source of truth:** Live GitHub repository at `smeagster86/grok-genome` (HEAD `7effc4346f70ff03266896a3be1166019dd45a04`).  
**Raw file URL:** https://raw.githubusercontent.com/smeagster86/grok-genome/main/DEVELOPMENT_HISTORY.md  
**Blob view:** https://github.com/smeagster86/grok-genome/blob/main/DEVELOPMENT_HISTORY.md

This document should be updated whenever major new phases, guardrail clarifications, or hard technical decisions occur.

*One data point among many. Built with care and radical respect for personal genomic data.*
