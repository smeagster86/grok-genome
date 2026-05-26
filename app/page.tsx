"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Shield, Download, Dna, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { DNAHelix } from "@/components/DNAHelix";
import { CategoryCard } from "@/components/CategoryCard";
import { SNPTable } from "@/components/SNPTable";
import { parseRawDNA, createAnalysisFromDemo, DEMO_DATASETS } from "@/lib/parsers";
import { AnalysisResult, Category } from "@/lib/types";
import { generatePDFReport } from "@/lib/pdfExport";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/knowledgeBase";

export default function GrokGenome() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [simulatedOverrides, setSimulatedOverrides] = useState<Record<string, string>>({});

  // Real file upload + parse
  const handleFileUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.txt')) {
      toast.error("Please upload a .txt raw DNA file");
      return;
    }

    setIsProcessing(true);

    try {
      const text = await file.text();
      const parsed = parseRawDNA(text, file.name);
      
      if (parsed.matchedVariants === 0) {
        toast.error("No known health-relevant variants were found in this file (or format not recognized). Try a demo instead.");
        setIsProcessing(false);
        return;
      }

      setResult(parsed);
      setSimulatedOverrides({});
      setActiveCategory(null);
      toast.success(`Analyzed ${parsed.matchedVariants} variants from ${file.name}`);

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } catch (e) {
      console.error(e);
      toast.error("Failed to read or parse the file. Make sure it's a valid raw DNA export.");
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

  // Apply what-if simulation (purely educational)
  const handleSimulate = (insight: any, newGenotype: string) => {
    const key = insight.snp.rsid;
    setSimulatedOverrides(prev => ({ ...prev, [key]: newGenotype }));
    
    toast.info(`Simulated ${newGenotype} for ${insight.snp.gene}. This is educational only — your actual genotype is unchanged.`, {
      duration: 4200
    });
  };

  // Build effective result with overrides applied for display
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
          {result && (
            <button onClick={resetAll} className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-full hover:bg-white/5 border border-white/10 transition">
              <RefreshCw className="w-3.5 h-3.5" /> New Analysis
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
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
                Upload 23andMe or MyHeritage raw data for rich, interactive, private health insights.
              </p>

              <div className="flex flex-wrap gap-3">
                <label className="upload-zone group inline-flex items-center gap-3 px-7 h-14 rounded-2xl bg-white text-[#0a0f1a] font-medium cursor-pointer active:scale-[0.985] transition" 
                       onDragOver={e => e.currentTarget.classList.add('dragover')} 
                       onDragLeave={e => e.currentTarget.classList.remove('dragover')}
                       onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); const f = e.dataTransfer.files[0]; if (f) handleFileUpload(f); }}>
                  <Upload className="w-4 h-4" />
                  Upload raw DNA file
                  <input type="file" accept=".txt" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }} />
                </label>

                <button onClick={() => loadDemo('23andMe')} className="h-14 px-6 rounded-2xl border border-white/15 hover:bg-white/5 transition font-medium flex items-center gap-2">
                  Try 23andMe Demo
                </button>
                <button onClick={() => loadDemo('MyHeritage')} className="h-14 px-6 rounded-2xl border border-white/15 hover:bg-white/5 transition font-medium flex items-center gap-2">
                  Try MyHeritage Demo
                </button>
              </div>
              <p className="text-xs text-white/40 mt-4">Supports standard raw data exports • Auto-detects format • Max ~50MB</p>
            </div>

            {/* Animated DNA */}
            <div className="hidden md:block md:col-span-5 relative h-[420px] -mr-6">
              <DNAHelix className="absolute inset-0" speed={1.05} active={!result} />
              <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[3px] text-emerald-400/60">DOUBLE HELIX • LIVE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-white/10 py-2.5 text-xs">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-white/50">
          <div>Zero data transmitted</div>
          <div>70+ clinically relevant SNPs</div>
          <div>6 insight categories</div>
          <div className="hidden md:block">Instant PDF export</div>
          <div>Educational simulators</div>
        </div>
      </div>

      {/* Processing state */}
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

      {/* Results Dashboard */}
      <AnimatePresence>
        {result && displayResult && (
          <div id="results" className="max-w-6xl mx-auto px-6 pt-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-3 mb-8">
              <div>
                <div className="uppercase tracking-[3.5px] text-xs text-emerald-400 mb-1.5">ANALYSIS COMPLETE — ALL PROCESSING DONE IN YOUR BROWSER</div>
                <div className="text-6xl font-semibold tracking-[-1.8px]">Your Insights</div>
                <div className="text-white/60 mt-1 font-mono text-sm">{result.fileName} • {result.format} format • {result.matchedVariants} variants matched</div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 h-12 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-[#0a0f1a] font-semibold transition shadow-lg shadow-emerald-950">
                  <Download className="w-4 h-4" /> Export Beautiful PDF
                </button>
                <button onClick={resetAll} className="h-12 px-6 rounded-2xl border border-white/15 hover:bg-white/5 font-medium">Start Over</button>
              </div>
            </div>

            {/* Big Score + Summary */}
            <div className="grid md:grid-cols-12 gap-6 mb-8">
              <div className="md:col-span-5 glass rounded-3xl p-8 border border-white/10 flex flex-col">
                <div className="uppercase text-xs tracking-[2px] text-white/50 mb-2">ILLUSTRATIVE GENETIC WELLNESS INDEX</div>
                <div className="text-[92px] font-semibold tabular-nums tracking-[-5.5px] leading-none text-white mb-1">{overallScore}</div>
                <div className="text-lg text-white/60">out of 100</div>
                <div className="mt-auto pt-4 text-xs text-white/50 leading-relaxed">This number is a simplified composite for exploration only. Real health depends on lifestyle, environment, other genes, and clinical testing.</div>
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

            {/* Category Cards - Click to filter */}
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="uppercase text-xs tracking-[2px] text-white/50">EXPLORE BY CATEGORY</div>
              {activeCategory && <button onClick={() => setActiveCategory(null)} className="text-xs text-emerald-400 hover:underline">Show all variants</button>}
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

            {/* SNP Explorer */}
            <div className="glass rounded-3xl border border-white/10 p-7">
              <div className="flex items-center justify-between mb-6 px-1">
                <div>
                  <div className="font-semibold text-2xl tracking-tight">SNP Explorer</div>
                  <div className="text-sm text-white/60">Search, filter, and simulate alternative genotypes (educational)</div>
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

            <div className="mt-6 text-[11px] text-center text-white/40 max-w-lg mx-auto">All analysis and simulations are performed locally. Simulations are purely for learning how different genotypes would change the interpretation — they do not alter your actual data.</div>
          </div>
        )}
      </AnimatePresence>

      {/* Education / How it works */}
      {!result && (
        <div className="max-w-5xl mx-auto px-6 py-14 text-center">
          <div className="text-xs uppercase tracking-[3px] text-emerald-400 mb-2">EDUCATIONAL EXPLORATION TOOL</div>
          <h3 className="text-4xl tracking-[-1.4px] font-semibold mb-4">How Grok Genome works</h3>
          <div className="grid md:grid-cols-3 gap-5 text-left mt-8">
            {[ 
              { title: "Private by Design", desc: "Your raw DNA file is read using the browser File API. Nothing is uploaded, logged, or sent anywhere — ever." },
              { title: "Curated Knowledge Base", desc: "We match ~80 high-signal SNPs with interpretations drawn from ClinVar, PharmGKB, GWAS catalogs, and published guidelines." },
              { title: "Interactive & Honest", desc: "Explore categories, read full explanations, and use 'What if' genotype simulators to understand how genetics actually works." },
            ].map((item, idx) => (
              <div key={idx} className="glass rounded-3xl p-7 border border-white/10 text-left">
                <div className="font-semibold text-xl mb-3 tracking-tight">{item.title}</div>
                <div className="text-[15px] leading-relaxed text-white/70">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strong disclaimer */}
      <div className="border-t border-white/10 bg-black/40 py-9 mt-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs text-white/50 leading-relaxed">
          <strong className="text-white/70">Medical Disclaimer:</strong> Grok Genome is an educational and personal exploration tool only. It is not intended to diagnose, treat, cure, or prevent any disease. 
          The information provided is based on publicly available research and should not replace professional medical advice, genetic counseling, or clinical genetic testing. Always consult qualified healthcare providers before making any health decisions.
        </div>
      </div>
    </div>
  );
}
