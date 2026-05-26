"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Shield, Download, Dna, RefreshCw, Heart } from "lucide-react";
import { toast } from "sonner";

import { DNAHelix } from "@/components/DNAHelix";
import { CategoryCard } from "@/components/CategoryCard";
import { SNPTable } from "@/components/SNPTable";
import { parseRawDNA, createAnalysisFromDemo, DEMO_DATASETS } from "@/lib/parsers";
import { AnalysisResult, Category } from "@/lib/types";
import { generatePDFReport } from "@/lib/pdfExport";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/knowledgeBase";
import { SupportModal } from "@/components/SupportModal";

export default function GrokGenome() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [simulatedOverrides, setSimulatedOverrides] = useState<Record<string, string>>({});
  const [showSupport, setShowSupport] = useState(false);

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
      toast.success(`Loaded rich ${key} demo data`);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 80);
      setIsProcessing(false);
    }, 650);
  };

  const resetAll = () => {
    setResult(null);
    setActiveCategory(null);
    setSimulatedOverrides({});
  };

  const handleSimulate = (insight: any, newGenotype: string) => {
    const key = insight.snp.rsid;
    setSimulatedOverrides(prev => ({ ...prev, [key]: newGenotype }));
    toast.info(`Simulated ${newGenotype} for ${insight.snp.gene} (educational only).`, { duration: 4200 });
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
    toast.success("Beautiful PDF report downloaded");
  };

  const overallScore = result 
    ? Math.max(48, Math.min(94, Math.round(72 + (result.matchedVariants - 8) * 1.4 - Object.keys(simulatedOverrides).length * 0.6)))
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f1a]/95 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Dna className="w-6 h-6 text-emerald-400" />
              <div className="font-semibold tracking-tighter text-2xl">Grok Genome</div>
            </div>
            <div className="text-[10px] px-2 py-px rounded bg-emerald-400/10 text-emerald-400 font-medium tracking-widest">PRIVATE</div>
          </div>

          <div className="flex items-center gap-3">
            {result && (
              <button onClick={resetAll} className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-full hover:bg-white/5 border border-white/10 transition">
                <RefreshCw className="w-3.5 h-3.5" /> New Analysis
              </button>
            )}
            <button 
              onClick={() => setShowSupport(true)}
              className="flex items-center gap-2 text-sm px-5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-400" /> Support
            </button>
          </div>
        </div>
      </nav>

      {/* Hero (same as before, with updated accepted formats text) */}
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
              
              <p className="max-w-lg text-2xl text-slate-400 tracking-tight mb-9">
                Upload 23andMe, MyHeritage, AncestryDNA, FamilyTreeDNA or VCF files.
              </p>

              <div className="flex flex-wrap gap-3">
                <label className="upload-zone group inline-flex items-center gap-3 px-7 h-14 rounded-2xl bg-white text-[#0a0f1a] font-medium cursor-pointer active:scale-[0.985] transition" 
                       onDragOver={e => e.currentTarget.classList.add('dragover')} 
                       onDragLeave={e => e.currentTarget.classList.remove('dragover')}
                       onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
                  <Upload className="w-4 h-4" />
                  Upload raw DNA file
                  <input type="file" accept=".txt,.vcf,.zip" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </label>

                <button onClick={() => loadDemo('23andMe')} className="h-14 px-6 rounded-2xl border border-white/15 hover:bg-white/5 transition font-medium flex items-center gap-2">
                  Try 23andMe Demo
                </button>
                <button onClick={() => loadDemo('MyHeritage')} className="h-14 px-6 rounded-2xl border border-white/15 hover:bg-white/5 transition font-medium flex items-center gap-2">
                  Try MyHeritage Demo
                </button>
              </div>
              <p className="text-xs text-white/40 mt-4">Supports .txt, .vcf, .zip • 23andMe • MyHeritage • AncestryDNA • FamilyTreeDNA • VCF</p>
            </div>

            <div className="hidden md:block md:col-span-5 relative h-[420px] -mr-6">
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
          <div>Educational simulators</div>
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
          <div id="results" className="max-w-6xl mx-auto px-6 pt-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-3 mb-8">
              <div>
                <div className="uppercase tracking-[3.5px] text-xs text-emerald-400 mb-1.5">ANALYSIS COMPLETE — ALL PROCESSING DONE IN YOUR BROWSER</div>
                <div className="text-6xl font-semibold tracking-[-1.8px]">Your Insights</div>
                <div className="text-white/60 mt-1 font-mono text-sm">{result.fileName} • {result.format} • {result.matchedVariants} variants</div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 h-12 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-[#0a0f1a] font-semibold transition shadow-lg shadow-emerald-950">
                  <Download className="w-4 h-4" /> Export Beautiful PDF
                </button>
                <button onClick={resetAll} className="h-12 px-6 rounded-2xl border border-white/15 hover:bg-white/5 font-medium">Start Over</button>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-6 mb-8">
              <div className="md:col-span-5 glass rounded-3xl p-8 border border-white/10 flex flex-col">
                <div className="uppercase text-xs tracking-[2px] text-white/50 mb-2">ILLUSTRATIVE GENETIC WELLNESS INDEX</div>
                <div className="text-[92px] font-semibold tabular-nums tracking-[-5.5px] leading-none text-white mb-1">{overallScore}</div>
                <div className="text-lg text-white/60">out of 100</div>
                <div className="mt-auto pt-4 text-xs text-white/50 leading-relaxed">Educational composite only. Real health is multifactorial.</div>
              </div>

              <div className="md:col-span-7 glass rounded-3xl p-7 border border-white/10">
                <div className="uppercase tracking-widest text-xs text-white/50 mb-4">QUICK OVERVIEW</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  {CATEGORY_ORDER.map(cat => {
                    const count = result.categories[cat].length;
                    if (count === 0) return null;
                    return (
                      <div key={cat} className="rounded-2xl bg-black/30 p-4">
                        <div className="text-emerald-400 text-xs mb-px">{CATEGORY_LABELS[cat].label}</div>
                        <div className="text-3xl font-semibold tracking-tighter tabular-nums">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between px-1">
              <div className="uppercase text-xs tracking-[2px] text-white/50">EXPLORE BY CATEGORY</div>
              {activeCategory && <button onClick={() => setActiveCategory(null)} className="text-xs text-emerald-400 hover:underline">Show all</button>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-9">
              {CATEGORY_ORDER.map(cat => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  insights={result.categories[cat]}
                  isActive={activeCategory === cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                />
              ))}
            </div>

            <div className="glass rounded-3xl border border-white/10 p-7">
              <div className="flex items-center justify-between mb-6 px-1">
                <div>
                  <div className="font-semibold text-2xl tracking-tight">SNP Explorer</div>
                  <div className="text-sm text-white/60">Search, filter, and run educational genotype simulations</div>
                </div>
                {Object.keys(simulatedOverrides).length > 0 && (
                  <button onClick={() => setSimulatedOverrides({})} className="text-xs px-4 py-2 rounded-xl border border-white/20 hover:bg-red-500/10 hover:border-red-500/30 flex items-center gap-1.5">
                    <RefreshCw size={14} /> Reset simulations
                  </button>
                )}
              </div>

              <SNPTable 
                insights={filteredInsights} 
                activeCategory={activeCategory || undefined} 
                onSimulate={handleSimulate} 
              />
            </div>

            <div className="mt-6 text-[11px] text-center text-white/40 max-w-lg mx-auto">All processing + simulations happen locally in your browser. Nothing is uploaded.</div>
          </div>
        )}
      </AnimatePresence>

      {!result && (
        <div className="max-w-5xl mx-auto px-6 py-14 text-center">
          <div className="text-xs uppercase tracking-[3px] text-emerald-400 mb-2">EDUCATIONAL EXPLORATION TOOL</div>
          <h3 className="text-4xl tracking-[-1.4px] font-semibold mb-4">How Grok Genome works</h3>
          <div className="grid md:grid-cols-3 gap-5 text-left mt-8">
            {[
              { title: "Private by Design", desc: "Your raw DNA file is read using the browser File API. Nothing is uploaded, logged, or sent anywhere — ever." },
              { title: "Broad Format Support", desc: "Works with 23andMe, MyHeritage, AncestryDNA, FamilyTreeDNA, and VCF files (including inside .zip)." },
              { title: "Interactive & Honest", desc: "Explore categories, read explanations, simulate different genotypes, and export a clean personal PDF report." },
            ].map((item, idx) => (
              <div key={idx} className="glass rounded-3xl p-7 border border-white/10 text-left">
                <div className="font-semibold text-xl mb-3 tracking-tight">{item.title}</div>
                <div className="text-[15px] leading-relaxed text-white/70">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-white/10 bg-black/40 py-9 mt-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs text-white/50 leading-relaxed">
          <strong className="text-white/70">Medical Disclaimer:</strong> Grok Genome is an educational and personal exploration tool only. It is not intended to diagnose, treat, cure, or prevent any disease. The information is based on publicly available research and should not replace professional medical advice, genetic counseling, or clinical genetic testing. Always consult qualified healthcare providers.
        </div>
      </div>

      <SupportModal isOpen={showSupport} onClose={() => setShowSupport(false)} />
    </div>
  );
}
