# Grok Genome — Development History

**Repository:** [smeagster86/grok-genome](https://github.com/smeagster86/grok-genome)  
**Default branch:** main  
**Current HEAD (as of document creation):** `ca0c005da2ab35727c137a9394b01d5d7e90bc58` (post-ancestry Step 1 updates, late May 2026)

> This document exists so that future Grok sessions (or human contributors) can read the complete story instead of losing critical context across conversation boundaries, context compactions, or hand-offs. It is the authoritative reference for the project's philosophy, guardrails, roadmap decisions, technical patterns, and hard-won build/deployment lessons.

---

## Executive Summary

Grok Genome is a **100% client-side, privacy-first Next.js 15 + TypeScript + Tailwind + Framer Motion** web application for exploring raw DNA data files (23andMe, MyHeritage, Ancestry, VCF, etc.). It provides curated SNP-level insights plus four rich synthesized profiles (Methylation Support, Drug Metabolism Tendencies, Nutrition & Metabolism Context, Sleep & Recovery Context) that strictly follow a probabilistic, humble, evidence-transparent framing.

The project began as an entirely different Windows automation tool for clinical note transfer and underwent an abrupt full pivot toward deeper, more thoughtful personal genomic analysis. It was then built through four deliberate phases (Evidence → Synthesis/Profiles → Trust Architecture → Beta Readiness) under extremely strict physician positioning guardrails. All genomic data never leaves the user's browser; only localStorage is used for non-genomic UI state (disclaimer dismissal + optional feedback). Exports (PDF, Markdown, JSON, CSV) carry the same humility language.

As of late May 2026, the site features consistent EvidenceBadge usage with population applicability notes, deepened Phase 4 profiles with Why boxes + 5–7 nuanced limitations each, a dedicated `/for-clinicians` route, a global first-visit disclaimer banner, local-only feedback, improved PDF Report Overview + page-break logic, and a full cascade of production build fixes. Phase 5 work (expert critical appraisals and Tier 1 high-priority improvements) is now underway.

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

## Phase 5: Expert Critical Appraisals, Ancestry Transparency (Step 1), and Transition to Gene–Environment Grounding (Step 2) (late May 2026 – ongoing)

After the core four phases and beta-readiness polish, the project entered a deliberate Phase 5 of expert-driven refinement. The user (a family physician) commissioned a panel of five specialists for independent critical appraisal of the tool's SNP selection, synthesis logic, limitations communication, ancestry handling, and overall framing:

- Bioethicist / population genetics (Okoro)
- Sleep medicine & circadian (Reyes)
- Statistical genetics / PRS (Vargas)
- Pharmacogenomics (Hale)
- Nutrition & metabolism (Sharma)

Raw reports were compiled into `EXPERT_CRITICAL_APPRAISALS_2026-05-27.md` (77 KB). These were synthesized into prioritized tiers with strong emphasis on consensus high-impact, low-risk improvements.

User directive (verbatim): "Please complete the full 'Do immediately' high-priority items systematically, one at a time" and "Yes please proceed with the next step" after each slice, with explicit instruction to circle back once complete.

### Step 1 – Finish ancestry communication (Tier 1 high-consensus)

- Added prominent global ancestry banner (exact text): "Important: Most genetic associations in this report are based primarily on European-ancestry studies. Applicability to other ancestries may be limited or unknown. Results should be interpreted with caution in non-European populations."
- Extended `EvidenceBadge` with `population` prop and reinforced legend entry for "Population applicability".
- Updated all four synthesized profiles (MethylationSupport, DrugMetabolismTendencies, NutritionMetabolismContext, SleepRecoveryContext) with the population note on every EvidenceBadge + strengthened ancestry language in 5Qs, Why boxes, and Limitations.
- Added dedicated "Ancestry and Population Considerations" section to `/for-clinicians` using the exact banner text.
- Strengthened Report Overview in PDF exports (pdfExport.ts) with explicit ancestry language.
- Live SHAs at completion of Step 1 (pre-gene-env): profiles 417b767f..., 3c183541..., cb0d2f75..., 04ef5dca...; page.tsx 5fdccc1f...; EvidenceBadge 274aee50...; pdfExport 8fe0ce33...; etc.

### Deep pre-change ancestry applicability analysis (non-European populations)

Before finalizing the ancestry updates, the user explicitly requested the pre-change state analysis: "I was asking the question before a change was made... answer the question asked before making changes."

The 5-expert panel was brought together on this exact point. Key synthesis:
- Most GWAS (including many of the 80+ SNPs) are European-biased; effect sizes and allele frequencies often do not port well (30–70% drop in predictive performance cited in literature).
- For weak signals (many of the sleep, nutrition, and wellness SNPs), the models are essentially "toy models" — useful for education and conversation starters but not calibrated for individuals outside the discovery populations.
- Stronger clinical signals (certain PGx pairs such as CYP2C19-clopidogrel, VKORC1-warfarin, and ALDH2 alcohol flush in East Asians) have clearer cross-ancestry relevance in some cases, but even these have exceptions and require clinical correlation.
- Top issues raised across the panel: systematic disclaimers required; no claim of equivalent applicability; environment usually dominates; consumer arrays have incomplete coverage for many ancestry-specific variants; risk of over-interpretation or anchoring; need for explicit "what this does not mean" language.

"What the tool can do" for non-European users: surface the matched raw SNPs with their metadata, apply the consistent 5Qs + humility framing, provide educational exports, and serve as a conversation starter with a clinician.

"What the tool cannot do": claim equivalent effect sizes or applicability, generate calibrated risk scores, override the dominance of environment/behavior, or substitute for validated clinical or ancestry-specific testing.

User response after the full panel synthesis: "Ok am very content and pleased with this discussion... please proceed with the next steps of the improvements as planned."

### Transition to Step 2 – Gene–environment dominance + grounded usefulness (Tier 1)

Next immediate priority (per the approved "Do immediately" list and expert consensus): add concise, visible gene–environment dominance callouts and explicit "what this does not mean" boundaries throughout the four profiles, KB entries where relevant, Report Overview, and exports.

Core framing (applied consistently): Environmental factors (diet quality, physical activity, sleep hygiene, medications, stress, light exposure, gut microbiome, etc.) typically explain the large majority of real-world variance for the traits discussed. The genetic signals surfaced here are one small, probabilistic contribution at best. Findings do not predict an individual's actual [methylation status / drug response / sleep quality / body weight / etc.]; they do not override lifestyle or environment; and they remain subject to the same ancestry and coverage limitations already disclosed.

This "grounded usefulness" lens ensures the tool remains educational and humble rather than creating false precision or anchoring.

Work on Step 2 (systematic, one profile at a time) begins immediately after this history update. Todo discipline maintained: exactly one item in_progress at a time; circle back to user after each major slice.

---

## Detailed Chronological Timeline

All dates below are May 26, 2026 (compressed intense development day) unless otherwise noted. Commits are listed in reverse chronological order (newest first) with exact messages from the repository.

| Commit SHA (short) | Message (verbatim) | Phase / Context |
|--------------------|--------------------|-----------------|
| (Phase 5 updates in progress) | Document curator append for ancestry Step 1 + pre-change expert panel + transition to gene-env Step 2 | Phase 5: Tier 1 high-priority items |
| ... (earlier Phase 5 ancestry Step 1 code changes) | EvidenceBadge population prop + legend; global ANCESTRY_BANNER in page.tsx + for-clinicians; population notes added to all 4 profiles; PDF Report Overview strengthened | Phase 5 Step 1: Ancestry transparency |
| 7effc4346f70ff03 | Fix build: Import MatchedInsight in app/page.tsx so the cast in the Quick Overview section compiles. | Final build fix (after TS indexing cast) |
| ... (earlier build fixes, Phase 4 profile upgrades, beta readiness, Phase 3 trust architecture, Phase 2 synthesis, Phase 1 evidence) | ... | Prior phases |

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
// app/page.tsx (key excerpts, current as of post-ancestry Step 1)
import Link from "next/link";
// ...
<nav>... <Link href="/#our-approach">Our Approach</Link> <Link href="/for-clinicians">For Clinicians</Link> ...</nav>

<FirstVisitDisclaimer />

// Prominent global ancestry banner (Tier 1)
const ANCESTRY_BANNER = "Important: Most genetic associations in this report are based primarily on European-ancestry studies...";

// Profile wiring
{profileFilter === 'methylation' && <MethylationSupport insights={...} />}
...

// Exports
<button onClick={handleExportFullReport}>Export Full Report</button>
...
```

### Profile Structure (representative — post-ancestry Step 1)

Every profile follows the exact pattern with added population notes on EvidenceBadge and reinforced ancestry language in 5Qs / Limitations.

```tsx
<EvidenceBadge
  level="Moderate Evidence"
  effect="Small-to-Modest Effects"
  ancestry="European-biased"
  status="Exploratory"
  population="Evidence primarily from European-ancestry studies; applicability to other populations is limited or unknown."
/>

{/* Why This Profile Matters */}
... (existing Why box)

{/* Genotype-aware summary */}
...

{/* Exact 5Qs (probabilistic language + ancestry notes) */}
...

{/* Limitations (ancestry + coverage + environment) */}
...

{/* Consistent trust footer */}
```

### EvidenceBadge Implementation (post-ancestry Step 1)

Multi-part labels with tooltip descriptions. Config-driven colors. `population` prop and legend entry for "Population applicability" added in Step 1.

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

## Key Files & Current State Snapshot (post-ancestry Step 1, pre-gene-env Step 2)

| Path | Purpose | Recent SHA (full or short) |
|------|---------|----------------------------|
| `app/page.tsx` | Main SPA: upload, analysis, all 4 profiles wired, exports, feedback, nav + global ancestry banner | `5fdccc1f92794478...` |
| `lib/knowledgeBase.ts` | Static curated SNPs (~80) with full professional metadata | `23af5773d820ae5c...` |
| `lib/exportUtils.ts` | toJSON/toCSV/toMarkdown + richer Phase 4 synthesized profiles | `ef803710be6ff9dd...` |
| `lib/pdfExport.ts` | jsPDF generator with Report Overview + strict page-breaks (ancestry language) | `8fe0ce3362833bec...` |
| `components/profiles/MethylationSupport.tsx` | Rich Phase 4 profile + population note | `417b767ff37aa81b...` |
| `components/profiles/DrugMetabolismTendencies.tsx` | Rich Phase 4 profile + population note | `3c183541a2daca0a...` |
| `components/profiles/NutritionMetabolismContext.tsx` | Rich Phase 4 profile + population note | `cb0d2f757fed3657...` |
| `components/profiles/SleepRecoveryContext.tsx` | Rich Phase 4 profile + population note | `04ef5dca32b4e852...` |
| `components/EvidenceBadge.tsx` | Reusable multi-part evidence labels + population legend | `274aee50dd16cb87...` |
| `app/for-clinicians/page.tsx` | Dedicated clinician guidance route (ancestry section added) | (current post-Step 1) |
| ... | ... | ... |

**Additional important files:** `app/layout.tsx`, `app/globals.css`, `components/SNPTable.tsx`, `components/CategoryCard.tsx`, `components/DNAHelix.tsx`, `components/SupportModal.tsx`, `EXPERT_CRITICAL_APPRAISALS_2026-05-27.md` (77 KB).

---

## How to Use This Document (for future AI sessions and contributors)

1. Read the **Executive Summary** + **Core Philosophy & Guardrails** first (5–10 minutes). This gives the non-negotiables.
2. Read **Approved Roadmap** and **Detailed Chronological Timeline** (including the new Phase 5 section) to understand the deliberate phase order and why certain build pain occurred.
3. Use **Technical Architecture & Patterns** + code snippets as the single source of truth for current implementation style (especially the 5Qs template, EvidenceBadge usage with population notes, Link discipline, and localStorage-only rule).
4. Consult **Key Files** table + current SHAs before making edits — always fetch fresh content via tools rather than relying on stale memory.
5. Before any large change, re-read the physician positioning principles and the exact 5Qs. They are the project's constitution.

Never introduce deterministic language. Never store genomic data client-side. Never bypass the EvidenceBadge or Limitations sections. When in doubt, quote this document.

---

## Appendix: Selected Verbatim User Directives & Tone (including Phase 5)

- "Phase 3 looks good — let's move into Phase 3: Trust Architecture..."
- "Great work — we now have four strong profiles... complete the Beta Readiness items..."
- "final pre-beta polish... upgrade all four... Specific Improvements... Show me the full updated code... Improve the PDF... Add a short Report Overview"
- "Private genomic intelligence for the individual, not a diagnostic service."
- Repeated emphasis on humility, no hype, exact 5Qs, probabilistic language, privacy (client-only, localStorage only).
- "Could you spawn a document curator and make a document that you can refer to if you need to on the github that collects in detail our discussions along way in the development of this site we are making"
- Full "Timeline of Major Shifts" block + "Adjust the story. I dont want to be out the gates sounding like I wanted to do something commercial. make a different but better origin story..."
- "Yes please implement all the improvements"
- Deep questions on the educational simulator (is it gimmicky? thoughtful redesign? expert communicator may want to weigh in) + "grounded usefulness" lens.
- "Please complete the full 'Do immediately' high-priority items systematically, one at a time: Step 1 – Finish ancestry... Then we will move to Step 2 (gene-environment dominance callouts)"
- "Thank you for the ancestry progress inside the profiles. Please complete the full 'Do immediately'..."
- "I dont see that you've actually answered that question. I was asking the question before a change was made... if you can answer the question asked before making changes" (ancestry applicability for non-Europeans, pre-change tool state, 5-expert panel, top-10 questions/issues per expert, what tool can/cannot do).
- "Ok am very content and pleased with this discussion... please proceed with the next steps of the improvements as planned"
- "Yes please continue with all the next step you're making great progress and well considered approach"
- "Yes please proceed"
- "Are you still working at themoment or waiting on a next prompt?"
- "Yes please proceed to step 2 and have document curator update what we've been up to"

---

## Footer

**Document created:** May 27, 2026 (PT) by Grok Document Curator subagent per explicit user request.  
**Source of truth:** Live GitHub repository at `smeagster86/grok-genome` (current HEAD post-ancestry Step 1).  
**Raw file URL:** https://raw.githubusercontent.com/smeagster86/grok-genome/main/DEVELOPMENT_HISTORY.md  
**Blob view:** https://github.com/smeagster86/grok-genome/blob/main/DEVELOPMENT_HISTORY.md

This document should be updated whenever major new phases, guardrail clarifications, or hard technical decisions occur.

*One data point among many. Built with care and radical respect for personal genomic data.*
