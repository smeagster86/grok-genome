# 🧬 Grok Genome

**Resuming from another computer or new Grok Builder session?**  
→ Read **[DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md)** — especially the "CURRENT STATUS & FORWARD PLAN FOR RESUMPTION" section at the top — for the complete record of the initial Grok Builder session (all phases + Phase 5 expert refinements + Tier 1), the verified file SHAs, and the exact Tier 2 roadmap. The code on `main` (HEAD `7f0408c...`) is the current state. This is the single source of truth for zero-loss handoff between Grok Builder instances.

**Private. Beautiful. Powerful.**

A stunning, 100% client-side DNA insights explorer for 23andMe and MyHeritage raw data files.

**Live Demo:** https://grok-genome.vercel.app (after deployment)

## ✨ Features
- Drag & drop or click to upload raw .txt files
- Auto-detects 23andMe and MyHeritage formats
- 80+ high-value curated SNPs across 6 categories
- Gorgeous animated DNA helix
- Interactive category cards that filter the explorer
- Fully searchable SNP table with expandable explanations
- Educational "What-if" genotype simulators (see how changing one letter changes the story)
- One-click beautiful PDF report export
- **Everything runs in your browser** — your DNA never leaves your computer

## 🚀 Deploy your own (one click)

1. Fork or clone this repo
2. Push to GitHub
3. Import the GitHub repo into [Vercel](https://vercel.com)
4. Deploy (Next.js is auto-detected)

Or just click the **Deploy** button once this repo is public.

## Local Development
```bash
git clone https://github.com/smeagster86/grok-genome
cd grok-genome
npm install
npm run dev
```

## Privacy & Ethics
This project exists to make personal genomics exploration beautiful, transparent, and private. No accounts. No tracking. No data exfiltration.

## Development

For the complete origin story, physician positioning guardrails, phased roadmap, technical patterns, build/deployment war stories, and verbatim decisions that shaped the project, see [DEVELOPMENT_HISTORY.md](DEVELOPMENT_HISTORY.md). This document serves as the long-term reference for future sessions and contributors.

## Important Medical Disclaimer
This is an **educational tool only**. It is not medical advice, diagnosis, or a substitute for clinical genetic testing or consultation with a physician or certified genetic counselor. Most health outcomes are multifactorial.

Built with care using Next.js, TypeScript, Framer Motion, and a deep respect for personal data.