# Grok Genome — Development History

**Repository:** [smeagster86/grok-genome](https://github.com/smeagster86/grok-genome)  
**Default branch:** main  
**Current HEAD (as of document creation):** `bec99b95c7d27bfa23aaf69d8bbbd497a45a03dc` (post-simulator redesign, late May 2026)

> This document exists so that future Grok sessions (or human contributors) can read the complete story instead of losing critical context across conversation boundaries, context compactions, or hand-offs. It is the authoritative reference for the project's philosophy, guardrails, roadmap decisions, technical patterns, and hard-won build/deployment lessons.

---

## Executive Summary

Grok Genome is a **100% client-side, privacy-first Next.js 15 + TypeScript + Tailwind + Framer Motion** web application for exploring raw DNA data files (23andMe, MyHeritage, Ancestry, VCF, etc.). It provides curated SNP-level insights plus four rich synthesized profiles (Methylation Support, Drug Metabolism Tendencies, Nutrition & Metabolism Context, Sleep & Recovery Context) that strictly follow a probabilistic, humble, evidence-transparent framing.

The project began as an entirely different Windows automation tool for clinical note transfer and underwent an abrupt full pivot toward deeper, more thoughtful personal genomic analysis. It was then built through four deliberate phases (Evidence → Synthesis/Profiles → Trust Architecture → Beta Readiness) under extremely strict physician positioning guardrails. All genomic data never leaves the user's browser; only localStorage is used for non-genomic UI state (disclaimer dismissal + optional feedback). Exports (PDF, Markdown, JSON, CSV) carry the same humility language.

As of late May 2026, the site features consistent EvidenceBadge usage with population applicability notes, deepened Phase 4 profiles with Why boxes + 5–7 nuanced limitations each, a dedicated `/for-clinicians` route, a global first-visit disclaimer banner, local-only feedback, improved PDF Report Overview + page-break logic, a full cascade of production build fixes, Step 3 profile reframes (toy model/90%+ dominance for weak-signal profiles), and the educational simulator redesign (narrowed to high-evidence PGx toy model only).

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

## Phase 5: Expert Critical Appraisals, Ancestry Transparency (Step 1), Gene–Environment Grounding (Step 2), Targeted Reframing of Weak-Signal Profiles (Step 3), and Educational Simulator Redesign (late May 2026)

After the core four phases and beta-readiness polish, the project entered a deliberate Phase 5 of expert-driven refinement. The user (a family physician) commissioned a panel of five specialists for independent critical appraisal of the tool's SNP selection, synthesis logic, limitations communication, ancestry handling, and overall framing:

- Bioethicist / population genetics (Okoro)
- Sleep medicine & circadian (Reyes)
- Statistical genetics / PRS (Vargas)
- Pharmacogenomics (Hale)
- Nutrition & metabolism (Sharma)

Raw reports were compiled into `EXPERT_CRITICAL_APPRAISALS_2026-05-27.md` (77 KB). These were synthesized into prioritized tiers with strong emphasis on consensus high-impact, low-risk improvements.

User directive (verbatim): "Please complete the full 'Do immediately' high-priority items systematically, one at a time" and repeated "Yes please proceed" / "full approvals" / "I think execute step 3" / "Yes please move to this next priority item" after each slice, with explicit instruction to circle back once complete.

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

Work on Step 2 (systematic, one profile at a time) began immediately after this history update. Todo discipline maintained: exactly one item in_progress at a time; circle back to user after each major slice. All four profiles received amber-bordered "Gene–Environment Context" callout boxes with reinforced language; for-clinicians and PDF Report Overview were also updated.

### Step 3 – Reframe DrugMetabolismTendencies and SleepRecoveryContext per expert critical appraisals (toy model / 90%+ environment dominance, narrow weak signals) (late May 2026)

After completion of Step 2 gene–environment callouts (with full user approvals and "no adjustment needed"), the user directed: "I think execute step 3".

Expert basis (synthesized from `EXPERT_CRITICAL_APPRAISALS_2026-05-27.md`, 77 KB raw reports):

- **Sleep medicine & circadian (Reyes)**: The 3-SNP model (CLOCK rs1801260/rs2305160, PER2 rs934945, MTNR1B rs10830963) captures <<2% of variance in sleep timing preferences. Large GWAS-derived PRS for chronotype reach only ~5–8% R² in Europeans; the large majority (typically 90%+) of differences are environmental/behavioral (light exposure, age, social schedules, stress, screen time). Strong recommendation for explicit "toy model / educational illustration only" framing, gene × environment emphasis cards, concrete modifiable levers (consistent morning bright light within 30–60 min of waking and dim evening lighting can shift timing 1–3+ hours; social jetlag of even 1–2 hours often dwarfs genetic signals), and "What this cannot tell you" language. Behavior usually moves the needle far more.

- **Statistical genetics / PRS (Vargas) + Pharmacogenomics (Hale)**: For DrugMetabolismTendencies, specific CPIC-supported pairs (CYP2C19*2-clopidogrel, VKORC1-warfarin) retain higher actionability, but overall drug response remains multifactorial — age, organ function, comedications, adherence, and comorbidities typically dominate. Consumer coverage gaps (CYP2D6/CYP3A4) are already well caveated. Recommendation to narrow the broader panel framing to a "toy model / educational illustration only," strengthen 90%+ clinical-factor dominance language, and tie any feedback to real modifiable levers (prescriber discussion, adherence, therapeutic monitoring) rather than over-weighting the limited common-variant signals.

Both profiles already contained the Step 2 gene–environment callouts. Step 3 further tightened the weak-signal profiles with explicit toy-model language, stronger quantitative humility (90%+ dominance), and direct ties to actionable levers while preserving the exact 5Qs structure, Why boxes, EvidenceBadges (with population notes), progressive disclosure, full Limitations panels, probabilistic tone, and trust footers.

**Changes implemented (live on GitHub):**

- **DrugMetabolismTendencies.tsx** (new file SHA `ea205b968372276e4fa1d36be39ad3c53f000ecb`; commit `8024984d49d7956e114a2106aaa53e686d1c6d13`):
  - Subtitle updated to "Narrow educational view of common pharmacogene indicators."
  - Gene–Environment Context box strengthened: explicit "toy model for education," "large majority of variability" from clinical factors (age, liver/kidney function, comedications, adherence, comorbidities, microbiome), "one small, probabilistic contribution at best," "does not predict your actual response."
  - Profile summary and 5Qs (especially Q1, Q4, Q5) tightened with panel-bounding language and emphasis on modifiable clinical levers (adherence, prescriber discussion, therapeutic monitoring).
  - Limitations list now leads with the toy-model / narrow-panel framing and 90%+ clinical dominance before the existing coverage and ancestry bullets.

- **SleepRecoveryContext.tsx** (new file SHA `9c5b78277b1d7b41a0d5fe6c3681ebd53c684367`; commit `bc7dadacca3b78b8c8ae8df56a1b89a03d968cde`):
  - Subtitle updated to "Toy model / educational illustration of circadian indicators."
  - Gene–Environment Context box substantially expanded: explicit "toy model for educational illustration only," <<2% variance for the 3-SNP model, "large majority (typically 90%+) are environmental and behavioral," concrete levers (morning bright light 30–60 min after waking + dim evening lighting can shift timing 1–3+ hours; social jetlag of 1–2 hours often dwarfs genetics), "behavior usually moves the needle far more," "genetic slice is typically minutes or less."
  - Profile summary and 5Qs (especially Q1, Q4, Q5) updated with variance humility and direct tie to modifiable levers (light hygiene, consistent schedules, stress management).
  - Limitations list now leads with the toy-model + 90%+ env dominance + specific levers before the existing ancestry/polygenicity bullets.

All prior guardrails were strictly upheld: exact 5 core questions structure preserved in both profiles, probabilistic/humility language only ("one data point among many," "toy model for educational illustration only," "typically explain the large majority," "behavior usually moves the needle far more," "consult your prescriber/clinician"), no deterministic or diagnostic claims, client-side execution only, EvidenceBadge + Limitations + trust footer intact, and no storage of genomic data.

User had given repeated full approvals for the prior steps ("Yes please proceed no adjustment needed," "full approvals," "I think execute step 3") immediately before this work. Todo discipline maintained throughout (exactly one item in_progress at a time).

Live SHAs after Step 3 profile pushes (as of commits 8024984d... and bc7dadac...):
- DrugMetabolismTendencies.tsx: ea205b968372276e4fa1d36be39ad3c53f000ecb
- SleepRecoveryContext.tsx: 9c5b78277b1d7b41a0d5fe6c3681ebd53c684367

### Educational Simulator Redesign (Phase 5 follow-up per expert appraisals) (late May 2026)

After Step 3, the next priority (per repeated expert consensus in the 2026-05-27 appraisals, especially Reyes, Vargas, Hale, and statistical/bioethics reviewers) was redesign of the broad "ILLUSTRATIVE GENETIC WELLNESS INDEX" gauge and simulation system in app/page.tsx.

The broad 0-100 gauge (heuristic based on matchedVariants and overrides) mixed high-evidence PGx signals with weak exploratory SNPs in nutrition, sleep, and behavioral categories. Experts flagged high risk of anchoring, illusion of precision, and over-weighting of low-variance signals (e.g., sleep 3-SNP model <<2% variance; most nutrition <4%). The current implementation (SVG gauge, tier labels that sound actionable, genotype simulation applied across all categories) was seen as creating anchoring risk on exploratory/weak signals.

**Changes implemented (live on GitHub):**

- Removed the broad "ILLUSTRATIVE GENETIC WELLNESS INDEX" gauge (0-100 SVG circle, heuristic score 72 + (matchedVariants-8)*1.4 - overrides*0.6, tier labels).
- Replaced with a narrow "EDUCATIONAL PGx TOY MODEL" card scoped exclusively to the high-evidence, CPIC-supported pharmacogene pairs (CYP2C19*2, VKORC1, etc. — the "exception" with real actionability per experts).
- Explicit "Toy model for education / illustration only — not a prediction of your response".
- Dominant visual: large bar for "Clinical, Environmental & Behavioral Factors (typically 90%+)" with tiny sliver for "Genetic (toy)".
- Concrete modifiable levers emphasized (discuss with prescriber, adherence, timing — often larger effects than the variants).
- "What this cannot tell you" framing.
- Simulation capability (existing simulatedOverrides/handleSimulate) reframed and scoped in the new card (still available in raw SNP view but now with strong bounding).
- Feature bar text updated to "High-evidence PGx toy model".
- All guardrails preserved (client-side, probabilistic language, no storage of genomic data, disclaimers, link to the full Drug profile with its Step 3 reframing).

New app/page.tsx SHA: `8b02239bc11dd6e13174c63544be8025af5b3ed2` (commit `bec99b95c7d27bfa23aaf69d8bbbd497a45a03dc`).

Updated the key files snapshot table and added timeline entry. User had given full approvals for the overall Phase 5 direction and "Yes please move to this next priority item."

Todo discipline maintained.

### Detailed Chronological Timeline (continued)

All dates below are May 2026 unless otherwise noted. Commits are listed in reverse chronological order (newest first).

| Commit SHA (short) | Message (verbatim) | Phase / Context |
|--------------------|--------------------|-----------------|
| `bec99b95c7d27bfa` | Phase 5: Educational simulator redesign per expert appraisals (narrow to high-evidence PGx toy model only; explicit 'toy model for education'; dominant 90%+ environment/clinical/behavior bar with tiny genetic sliver; concrete modifiable levers; removed broad wellness gauge to avoid anchoring on weak signals; scoped simulation; guardrails upheld) | Phase 5 simulator redesign |
| `8aace527f1029270` | Phase 5 Step 3 curator append: Reframe DrugMetabolismTendencies and SleepRecoveryContext per expert appraisals (toy model emphasis, 90%+ env dominance, modifiable levers); new SHAs + commits; guardrails upheld | Phase 5 Step 3 HISTORY update |
| `bc7dadacca3b78b8` | Phase 5 Step 3: Reframe SleepRecoveryContext per expert critical appraisals (explicit toy model/educational illustration only for the weak 3-SNP model; 90%+ environment dominance with concrete modifiable levers (light hygiene, schedules, stress); narrow weak signals; preserve 5Qs + probabilistic guardrails) | Phase 5 Step 3: Sleep profile reframing |
| `8024984d49d7956e` | Phase 5 Step 3: Reframe DrugMetabolismTendencies per expert critical appraisals (narrow panel as toy model/educational illustration only; strengthen 90%+ clinical/environment dominance language; tie to modifiable levers; preserve 5Qs + probabilistic guardrails) | Phase 5 Step 3: Drug profile reframing |
| (earlier Phase 5 ancestry Step 1 + gene-env Step 2 + Step 3 profile pushes) | ... | Prior Phase 5 Tier 1 items |
| `7effc4346f70ff03` | Fix build: Import MatchedInsight in app/page.tsx so the cast in the Quick Overview section compiles. | Final build fix |
| ... (earlier Phase 5 ancestry Step 1 code changes, Phase 4 profile upgrades, beta readiness, Phase 3 trust architecture, Phase 2 synthesis, Phase 1 evidence) | ... | Prior phases |

**Build war stories (repeated full context loss & recovery):** 
- Multiple instances of `app/page.tsx` becoming corrupted during large edits (file reduced to partial imports, wrong SHAs, 15–167 bytes). Complete restores were performed using fresh `get_file_contents` SHAs from the repository.
- Repeated Vercel build failures on every deployment wave: SupportModal prop mismatches, missing imports, knowledgeBaseVersion, `<a>` vs `<Link>` (ESLint `no-html-link-for-pages`), unescaped quotes in JSX, TypeScript indexing errors on `result.categories[cat]` (required explicit `Record<Category, MatchedInsight[]>` casts), "Cannot find name 'MatchedInsight'."
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
// app/page.tsx (key excerpts, post-simulator redesign)
import Link from "next/link";
// ...
<nav>... <Link href="/#our-approach">Our Approach</Link> <Link href="/for-clinicians">For Clinicians</Link> ...</nav>

<FirstVisitDisclaimer />

// Prominent global ancestry banner (Tier 1)
const ANCESTRY_BANNER = "Important: Most genetic associations in this report are based primarily on European-ancestry studies...";

// Profile wiring
{profileFilter === 'methylation' && <MethylationSupport insights={...} />}
{profileFilter === 'drug' && <DrugMetabolismTendencies ... />}
{profileFilter === 'nutrition' && <NutritionMetabolismContext ... />}
{profileFilter === 'sleep' && <SleepRecoveryContext ... />}

// Exports
<button onClick={handleExportFullReport}>Export Full Report</button>
...
```

### Profile Structure (representative — post-Step 3 reframes)

Every profile follows the exact pattern with added population notes on EvidenceBadge, reinforced ancestry language, Step 2 gene–environment callouts, and (for Drug and Sleep) Step 3 toy-model / 90%+ dominance / modifiable-lever strengthening.

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

{/* Gene–Environment Context (Step 2 + Step 3 strengthening for Drug/Sleep) */}
... (amber box with 90%+ dominance, toy model language, concrete levers)

{/* Genotype-aware summary (bounded for weak-signal profiles) */}
...

{/* Exact 5Qs (probabilistic language + ancestry notes + toy model humility for Drug/Sleep) */}
...

{/* Progressive disclosure */}
<button onClick={() => setShowDetails(!showDetails)}>
  {showDetails ? "Simple view" : "Show detailed SNPs"}
</button>

{/* Detailed SNPs panel with mini evidence notes */}
...

{/* Limitations (5–7 nuanced items; toy model + 90%+ env bullets now lead for Drug/Sleep) */}
...

{/* Consistent trust footer */}
```

### EvidenceBadge Implementation (post-ancestry Step 1)

Multi-part labels with tooltip descriptions. Config-driven colors. `population` prop and legend entry for "Population applicability" added in Step 1 (unchanged in Steps 2–3).

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

## Key Files & Current State Snapshot (post-simulator redesign, late May 2026)

| Path | Purpose | Recent SHA (full or short) |
|------|---------|----------------------------|
| `app/page.tsx` | Main SPA: upload, analysis, all 4 profiles wired, exports, feedback, nav + global ancestry banner; broad wellness gauge removed, narrow high-evidence PGx toy model added | `8b02239bc11dd6e13174c63544be8025af5b3ed2` |
| `lib/knowledgeBase.ts` | Static curated SNPs (~80) with full professional metadata | `23af5773d820ae5c...` |
| `lib/exportUtils.ts` | toJSON/toCSV/toMarkdown + richer Phase 4 synthesized profiles | `ef803710be6ff9dd...` |
| `lib/pdfExport.ts` | jsPDF generator with Report Overview + strict page-breaks (ancestry language) | `8fe0ce3362833bec...` |
| `components/profiles/MethylationSupport.tsx` | Rich Phase 4 profile + population note + gene-env callout (Step 2) | `417b767ff37aa81b...` |
| `components/profiles/DrugMetabolismTendencies.tsx` | Rich Phase 4 profile + population note + gene-env callout (Step 2) + Step 3 toy model / 90%+ clinical dominance reframing | `ea205b968372276e4fa1d36be39ad3c53f000ecb` |
| `components/profiles/NutritionMetabolismContext.tsx` | Rich Phase 4 profile + population note + gene-env callout (Step 2) | `cb0d2f757fed3657...` |
| `components/profiles/SleepRecoveryContext.tsx` | Rich Phase 4 profile + population note + gene-env callout (Step 2) + Step 3 explicit toy model / 90%+ env dominance + concrete levers reframing | `9c5b78277b1d7b41a0d5fe6c3681ebd53c684367` |
| `components/EvidenceBadge.tsx` | Reusable multi-part evidence labels + population legend | `274aee50dd16cb87...` |
| `app/for-clinicians/page.tsx` | Dedicated clinician guidance route (ancestry section + Ancestry & PRS Limitations from expert synthesis) | (post-Step 1/2) |
| ... | ... | ... |

**Additional important files:** `app/layout.tsx`, `app/globals.css`, `components/SNPTable.tsx`, `components/CategoryCard.tsx`, `components/DNAHelix.tsx`, `components/SupportModal.tsx`, `EXPERT_CRITICAL_APPRAISALS_2026-05-27.md` (77 KB).

---

## How to Use This Document (for future AI sessions and contributors)

1. Read the **Executive Summary** + **Core Philosophy & Guardrails** first (5–10 minutes). This gives the non-negotiables.
2. Read **Approved Roadmap** and **Detailed Chronological Timeline** (including the new Phase 5 simulator redesign subsection) to understand the deliberate phase order and why certain build pain occurred.
3. Use **Technical Architecture & Patterns** + code snippets as the single source of truth for current implementation style (especially the 5Qs template, EvidenceBadge usage with population notes, Link discipline, localStorage-only rule, Step 3 toy-model / 90%+ dominance language for weak-signal profiles, and the narrow PGx toy model in the results section post-simulator redesign).
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
- "Please complete the full 'Do immediately' high-priority items systematically, one at a time: Step 1 — Finish ancestry... Then we will move to Step 2 (gene-environment dominance callouts)"
- "Thank you for the ancestry progress inside the profiles. Please complete the full 'Do immediately'..."
- "I dont see that you've actually answered that question. I was asking the question before a change was made... if you can answer the question asked before making changes" (ancestry applicability for non-Europeans, pre-change tool state, 5-expert panel, top-10 questions/issues per expert, what tool can/cannot do).
- "Ok am very content and pleased with this discussion... please proceed with the next steps of the improvements as planned"
- "Yes please continue with all the next step you're making great progress and well considered approach"
- "Yes please proceed"
- "Are you still working at themoment or waiting on a next prompt?"
- "Yes please proceed to step 2 and have document curator update what we've been up to"
- "Yes please proceed no adjustment needed"
- "Yes this sounds really good. Please proceed"
- "Yes please do"
- "No change in scope needed at the moment please proceed with the next steps"
- "Yes please proceed no adjustment needed"
- "No micro adjustments needed"
- "Yes execute. no adjustment needed"
- "Yes this sounds really good. Please proceed"
- "Yes this sounds really good please go ahead"
- "Yes sounds great please continue"
- "Sounds good thanks please continue thanks for the update"
- "Are we ready for next steps?"
- "Yes please go ahead"
- "How is everything going are we ready for next steps"
- "Yes please move ahead and do so"
- "Please let me know where you are at. If you are ready for next step please proceed you have full approvals for anything you need"
- "No continue final push until done"
- "can you stop this for the moment and shift focus"
- "no actually please carry on"
- "Yes please let me know and carry on"
- "i want to exit and restart builder will you still remember where you were with your work?"
- "Can you save your work. I need to exit the app and dont want you to lose it. Let me know when I can exit want to make sure you dont lose your work or tasks you have planned to complete stil"
- "Yes please carry on"
- "Yes you have full approvals. Please carry on with the next prompt and phase. you have full approvals with all you need"
- "I think execute step 3"
- "Yes please move to this next priority item"

---

## Footer

**Document created:** May 27, 2026 (PT) by Grok Document Curator subagent per explicit user request.  
**Updated:** late May 2026 (PT) with Phase 5 Step 3 profile reframes, curator append, and educational simulator redesign.  
**Source of truth:** Live GitHub repository at `smeagster86/grok-genome` (HEAD post-simulator redesign: bec99b95...).  
**Raw file URL:** https://raw.githubusercontent.com/smeagster86/grok-genome/main/DEVELOPMENT_HISTORY.md  
**Blob view:** https://github.com/smeagster86/grok-genome/blob/main/DEVELOPMENT_HISTORY.md

This document should be updated whenever major new phases, guardrail clarifications, or hard technical decisions occur.

*One data point among many. Built with care and radical respect for personal genomic data.*
