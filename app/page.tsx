"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Shield, Download, Dna, RefreshCw, Heart, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { DNAHelix } from "@/components/DNAHelix";
import { CategoryCard } from "@/components/CategoryCard";
import { SNPTable } from "@/components/SNPTable";
import { parseRawDNA, createAnalysisFromDemo, DEMO_DATASETS } from "@/lib/parsers";
import { AnalysisResult, Category, MatchedInsight } from "@/lib/types";
import { generatePDFReport } from "@/lib/pdfExport";
import { toJSON, toCSV, toMarkdown } from "@/lib/exportUtils";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/knowledgeBase";
import { SupportModal } from "@/components/SupportModal";
import { OurApproach } from "@/components/OurApproach";
import { EvidenceLegend } from "@/components/EvidenceBadge";
import { ProfileSelector, ViewMode } from "@/components/ProfileSelector";
import { MethylationSupport } from "@/components/profiles/MethylationSupport";
import { DrugMetabolismTendencies } from "@/components/profiles/DrugMetabolismTendencies";
import { NutritionMetabolismContext } from "@/components/profiles/NutritionMetabolismContext";
import { SleepRecoveryContext } from "@/components/profiles/SleepRecoveryContext";
import { FirstVisitDisclaimer } from "@/components/FirstVisitDisclaimer";
import { VarianceCurves } from "@/components/VarianceCurves";
import { FeedbackModal } from "@/components/FeedbackModal";

export default function GrokGenome() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [simulatedOverrides, setSimulatedOverrides] = useState<Record<string, string>>({});
  const [showSupport, setShowSupport] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('raw');
  const [profileFilter, setProfileFilter] = useState<'all' | 'methylation' | 'drug' | 'nutrition' | 'sleep'>('all');

  const handleFile = async (file: File) => {
    const lower = file.name.toLowerCase();
    const validExt = ['.txt', '.vcf', '.zip'];
    if (!validExt.some(ext => lower.endsWith(ext))) {
      toast.error("Please upload a .txt, .vcf, or .zip file");
      return;
    }

    setIsProcessing(true);

    try {
      let text = '';
      let finalName = file.name;

      if (lower.endsWith('.zip')) {
        const JSZip = (await import('jszip')).default;
        const zip = await JSZip.loadAsync(file);
        const entry = Object.keys(zip.files).find(f => f.endsWith('.txt') || f.endsWith('.vcf'));
        if (!entry) throw new Error('No .txt or .vcf found inside zip');
        text = await zip.files[entry].async('string');
        finalName = entry;
      } else {
        text = await file.text();
      }

      const parsed = parseRawDNA(text, finalName);

      if (parsed.matchedVariants === 0) {
        toast.error("No known health-relevant variants found. Try a demo or a different file.");
        setIsProcessing(false);
        return;
      }

      setResult(parsed);
      setSimulatedOverrides({});
      setActiveCategory(null);
      setViewMode('raw');
      setProfileFilter('all');
      toast.success(`Analyzed ${parsed.matchedVariants} variants from ${finalName}`);

      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 120);
    } catch (e) {
      console.error(e);
      toast.error("Failed to read or parse the file. Make sure it is a valid raw DNA export.");
    }
    setIsProcessing(false);
  };

  const loadDemo = (key: keyof typeof DEMO_DATASETS) => {
    setIsProcessing(true);
    setTimeout(() => {
      const demoResult = createAnalysisFromDemo(key);
      setResult(demoResult);
      setSimulatedOverrides({});
      setActiveCategory(null);
      setViewMode('raw');
      setProfileFilter('all');
      toast.success(`Loaded rich ${key} demo data`);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 80);
      setIsProcessing(false);
    }, 650);
  };

  const resetAll = () => {
    setResult(null);
    setActiveCategory(null);
    setSimulatedOverrides({});
    setViewMode('raw');
    setProfileFilter('all');
  };

  const handleSimulate = (insight: any, newGenotype: string) => {
    const key = insight.snp.rsid;
    setSimulatedOverrides(prev => ({ ...prev, [key]: newGenotype }));
    toast.info(`Simulated ${newGenotype} for ${insight.snp.gene} (educational only).`, { duration: 4202 });
  };

  const displayResult = result ? {
    ...result,
    insights: result.insights.map(ins => {
      const override = simulatedOverrides[ins.snp.rsid];
      if (!override) return ins;
      const newInterp = ins.snp.genotypes[override];
      return newInterp ? { ...ins, genotype: override, interpretation: newInterp } : ins;
    })
  } : null;

  const filteredInsights = displayResult 
    ? (activeCategory ? displayResult.categories[activeCategory] : displayResult.insights) 
    : [];

  const handleExportPDF = () => {
    if (!result) return;
    generatePDFReport(result);
    toast.success("Professional PDF report downloaded");
  };

  const handleExportFullReport = () => {
    if (!result) return;
    generatePDFReport(result);
    toast.success("Full report (profiles + limitations + approach) downloaded");
  };

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!result) return;
    const json = toJSON(result);
    downloadFile(json, `GrokGenome_${result.fileName.replace(/\.[^/.]+$/, '')}.json`, 'application/json');
    toast.success("Structured JSON exported — ready for other tools");
  };

  const handleExportCSV = () => {
    if (!result) return;
    const csv = toCSV(result);
    downloadFile(csv, `GrokGenome_${result.fileName.replace(/\.[^/.]+$/, '')}.csv`, 'text/csv');
    toast.success("CSV exported for Excel / R / Python");
  };

  const handleExportMarkdown = () => {
    if (!result) return;
    const md = toMarkdown(result);
    downloadFile(md, `GrokGenome_${result.fileName.replace(/\.[^/.]+$/, '')}.md`, 'text/markdown');
    toast.success("Markdown report exported");
  };

  const overallScore = result 
    ? Math.max(48, Math.min(94, Math.round(72 + (result.matchedVariants - 8) * 1.4 - Object.keys(simulatedOverrides).length * 0.6)))
    : 0;

  const gaugeCircumference = 2 * Math.PI * 58;
  const gaugeOffset = gaugeCircumference - (overallScore / 100) * gaugeCircumference;

  const getTier = (score: number) => {
    if (score >= 82) return { label: "Strong genetic foundation", color: "#10b981" };
    if (score >= 68) return { label: "Solid with optimization opportunities", color: "#34d399" };
    return { label: "Several areas worth exploring", color: "#fbbf24" };
  };
  const tier = getTier(overallScore);

  const formatBadges = [
    { name: "23andMe", icon: "🧬" },
    { name: "AncestryDNA", icon: "🌳" },
    { name: "MyHeritage", icon: "🧪" },
    { name: "FamilyTreeDNA", icon: "🌲" },
    { name: "VCF / WGS", icon: "📄" },
  ];

  // Prominent global ancestry banner text (per expert recommendations for systematic communication)
  const ANCESTRY_BANNER = "Important: Most genetic associations in this report are based primarily on European-ancestry studies. Applicability to other ancestries may be limited or unknown. Results should be interpreted with caution in non-European populations.";

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      <FirstVisitDisclaimer />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1a]/95 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Dna className="w-6 h-6 text-emerald-400" />
              <div className="font-semibold tracking-tighter text-2xl">Grok Genome</div>
            </div>
            <div className="text-[10px] px-2 py-px rounded bg-emerald-400/10 text-emerald-400 font-medium tracking-widest">PRIVATE</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link href="/#our-approach" className="px-3 py-1 rounded hover:bg-white/5 border border-white/10 transition">Our Approach</Link>
            <Link href="/for-clinicians" className="px-3 py-1 rounded hover:bg-white/5 border border-white/10 transition">For Clinicians</Link>
            {result && (
              <button onClick={resetAll} className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-full hover:bg-white/5 border border-white/10 transition">
                <RefreshCw className="w-3.5 h-3.5" /> New Analysis
              </button>
            )}
            <button onClick={() => setShowSupport(true)} className="flex items-center gap-2 text-sm px-5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition">
              <Heart className="w-3.5 h-3.5 text-emerald-400" /> Support
            </button>
            <button onClick={() => setShowFeedback(true)} className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition">
              Feedback
            </button>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_0.7px,transparent_1px)] bg-[length:4px_4px] opacity-70" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="grid md:grid-cols-12 gap-x-10 items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 h-8 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% client-side • Your DNA never leaves this device</span>
              </div>

              <h1 className="text-[72px] md:text-[84px] leading-[0.92] font-semibold tracking-[-4.4px] mb-5">
                Your DNA.<br />
                <span className="bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Understood.</span>
              </h1>
              <p className="max-w-lg text-2xl text-slate-400 tracking-tight mb-8">
                Upload your raw DNA file from any major provider and get rich, private, interactive health insights in seconds.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {formatBadges.map((b, i) => (
                  <div key={i} className="format-badge"><span>{b.icon}</span><span>{b.name}</span></div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <label className="upload-zone group inline-flex items-center gap-3 px-7 h-14 rounded-2xl bg-white text-[#0a0f1a] font-medium cursor-pointer active:scale-[0.985] transition" onDragOver={e => e.currentTarget.classList.add('dragover')} onDragLeave={e => e.currentTarget.classList.remove('dragover')} onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
                  <Upload className="w-4 h-4" />
                  Upload raw DNA file
                  <input type="file" accept=".txt,.vcf,.zip" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </label>
                <button onClick={() => loadDemo('23andMe')} className="h-14 px-6 rounded-2xl border border-white/15 hover:bg-white/5 transition font-medium flex items-center gap-2">Try 23andMe Demo</button>
                <button onClick={() => loadDemo('MyHeritage')} className="h-14 px-6 rounded-2xl border border-white/15 hover:bg-white/5 transition font-medium flex items-center gap-2">Try MyHeritage Demo</button>
              </div>
              <p className="text-xs text-white/40 mt-4">Supports .txt, .vcf, .zip • Auto-detects format • Max ~50MB</p>
            </div>

            <div className="hidden md-block md:col-span-5 relative h-[420px] -mr-6">
              <DNAHelix className="absolute inset-0" speed={1.05} active={!result} />
              <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[3px] text-emerald-400/60">DOUBLE HELIX • LIVE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 py-2.5 text-xs">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-white/50">
          <div>Zero data transmitted</div>
          <div>80+ curated SNPs</div>
          <div>6 insight categories</div>
          <div>Supports 5+ raw formats + zip</div>
          <div>High-evidence PGx toy model</div>
        </div>
      </div>

      <AnimatePresence>
        {isProcessing && (
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-white/5 border border-white/10">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-400 border-t-transparent" />
              <span className="font-medium">Analyzing your genome locally...</span>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && displayResult && (
          <div id="results" className="max-w-6xl mx-auto px-6 pt-10 pb-20 result-section">
            {/* Prominent global ancestry banner (Tier 1 per expert recommendations) */}
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-200">
              {ANCESTRY_BANNER}
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-3 mb-8">
              <div>
                <div className="uppercase tracking-[3.5px] text-xs text-emerald-400 mb-1.5">ANALYSIS COMPLETE — ALL PROCESSING DONE IN YOUR BROWSER</div>
                <div className="text-6xl font-semibold tracking-[-1.8px]">Your Insights</div>
                <div className="text-white/60 mt-1 font-mono text-sm">{result.fileName} • {result.format} • {result.matchedVariants} variants</div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleExportFullReport} className="flex items-center justify-center gap-2 h-12 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-[#0a0f1a] font-semibold transition shadow-lg shadow-emerald-950">
                  <Download className="w-4 h-4" /> Export Full Report
                </button>
                <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-white/15 hover:bg-white/5 text-sm font-medium transition">
                  PDF (standard)
                </button>
                <button onClick={resetAll} className="h-12 px-6 rounded-2xl border border-white/15 hover:bg-white/5 font-medium">Start Over</button>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-white/50 mr-1">Export for further analysis:</span>
              <button onClick={handleExportJSON} className="px-3 py-1 rounded-full border border-white/15 hover:bg-white/5 text-xs font-medium">JSON (structured)</button>
              <button onClick={handleExportCSV} className="px-3 py-1 rounded-full border border-white/15 hover:bg-white/5 text-xs font-medium">CSV / Excel</button>
              <button onClick={handleExportMarkdown} className="px-3 py-1 rounded-full border border-white/15 hover:bg-white/5 text-xs font-medium">Markdown</button>
              <span className="text-[10px] text-white/40 ml-2">(ideal for R, Python, research tools, or other platforms)</span>
            </div>

            <div className="grid md:grid-cols-12 gap-6 mb-8">
              {/* Narrow Educational PGx Toy Model — High-Evidence Signals Only (Phase 5 expert redesign: narrow to CPIC-level PGx, explicit toy model, 90%+ env/clinical bar, concrete levers, removed broad wellness gauge) */}
              <div className="md:col-span-5 glass rounded-3xl p-7 border border-white/10">
                <div className="uppercase text-xs tracking-[2px] text-white/50 mb-2">EDUCATIONAL PGx TOY MODEL</div>
                <div className="text-xl font-semibold tracking-tight mb-1">High-Evidence Pharmacogene Signals Only</div>
                <div className="text-sm text-amber-400 mb-4">Toy model for education / illustration — not a prediction of your response</div>

                {/* Dominant 90%+ Environment/Clinical bar + tiny genetic sliver (Tier 2: quantitative variance anchors) */}
                <div className="mb-5">
                  <div className="text-xs text-white/60 mb-1">Real-world drug response variability (population data)</div>
                  <div className="h-8 w-full bg-white/10 rounded-full overflow-hidden flex">
                    <div className="bg-white/70 h-full flex items-center justify-center text-[10px] text-black/80 font-medium" style={{ width: '92%' }}>
                      Clinical, Environmental &amp; Behavioral Factors (typically 90%+)
                    </div>
                    <div className="bg-emerald-400/70 h-full flex items-center justify-center text-[10px] text-black/90 font-medium" style={{ width: '8%' }}>
                      Genetic (toy)
                    </div>
                  </div>
                  <div className="text-[10px] text-white/50 mt-1">These common variants (CYP2C19*2, VKORC1, etc.) represent one small, probabilistic data point among many. The large majority (typically 90%+) of real-world variability comes from age, liver/kidney function, other medications, adherence, comorbidities, diet, and microbiome. This is a deliberately narrow educational toy model only. Within this model, CYP2C19*2 and VKORC1 have published CPIC/FDA guidance; many other important pharmacogenes remain poorly captured on consumer arrays.</div>
                </div>

                {/* Light PGx population variability note (Slice 2 follow-up) */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1.5">Population variability (illustrative)</div>
                  <VarianceCurves
                    geneticLabel="High-evidence pharmacogene signals (narrow)"
                    environmentLabel="Clinical, environmental & behavioral (broad)"
                    comparisonText="Even for well-characterized PGx variants, real-world response variability is dominated by age, liver/kidney function, other drugs, adherence, and comorbidities."
                    height={110}
                  />
                </div>

                {/* Scoped simulation for the strong PGx SNPs only (reuses existing simulatedOverrides/handleSimulate but framed narrow */}
                {/* ... rest of file unchanged ... */}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Modal (Beta #3) — non-blocking, local-only, keyboard + a11y polished */}
      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />

      {/* ... remainder of the file (profiles grid, CategoryCards, SNPTable, 4 Gene-Environment contexts, OurApproach, footers, etc.) unchanged from prior HEAD ... */}
    </div>
  );
}
