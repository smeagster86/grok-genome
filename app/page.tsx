"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Shield, Download, Search, Dna, Heart, Activity, Zap, Users, BookOpen } from "lucide-react";
import { Toaster } from "sonner";

// Types and knowledge base will be imported
// For now this is a beautiful shell that we'll flesh out

export default function GrokGenome() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    
    // Simulate processing for beautiful demo (we will implement real parser next)
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    setIsProcessing(false);
    setHasResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const handleDemoLoad = (source: string) => {
    setFileName(`${source} Demo Data`);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasResults(true);
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_0.8px,transparent_1px)] bg-[length:5px_5px]" />
        
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
              <Dna className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">100% Private • Browser Only</span>
            </div>
          </div>

          <h1 className="text-center text-7xl font-semibold tracking-tighter mb-4">
            Understand your DNA.<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Beautifully.
            </span>
          </h1>
          
          <p className="text-center text-2xl text-slate-400 max-w-2xl mx-auto mb-10">
            Upload your raw 23andMe or MyHeritage data. 
            Get rich, interactive health insights. No data leaves your device.
          </p>

          {/* Upload Zone */}
          <div className="max-w-xl mx-auto">
            <label 
              className="upload-zone group block border-2 border-dashed border-white/20 hover:border-emerald-500/60 rounded-3xl p-12 text-center cursor-pointer bg-white/5 backdrop-blur-xl transition-all"
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
              onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file);
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Upload className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <div className="font-semibold text-xl mb-1">Drop your raw DNA file here</div>
                  <div className="text-slate-400">.txt files from 23andMe or MyHeritage • Up to ~50MB</div>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".txt,text/plain" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }} 
                />
                <div className="text-xs text-slate-500 mt-2">Your DNA is processed entirely in your browser</div>
              </div>
            </label>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button 
                onClick={() => handleDemoLoad('23andMe')}
                className="text-sm px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-2"
              >
                Load 23andMe Demo
              </button>
              <button 
                onClick={() => handleDemoLoad('MyHeritage')}
                className="text-sm px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-2"
              >
                Load MyHeritage Demo
              </button>
            </div>
          </div>
        </div>

        {/* Subtle DNA decoration */}
        <div className="absolute right-12 top-24 opacity-30 hidden xl:block">
          <Dna className="w-56 h-56 text-emerald-400" />
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-b border-white/10 py-3">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-x-8 text-sm text-slate-400">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Zero uploads</div>
          <div>Auto format detection</div>
          <div>70+ curated variants</div>
          <div>Instant PDF reports</div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {hasResults && (
          <div id="results" className="max-w-5xl mx-auto px-6 pt-12 pb-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-emerald-400 text-sm tracking-[3px] font-medium mb-1">ANALYSIS COMPLETE</div>
                <h2 className="text-5xl tracking-tighter font-semibold">Your Genetic Insights</h2>
                <p className="text-slate-400 mt-2">File: <span className="font-mono text-sm text-slate-300">{fileName}</span></p>
              </div>
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-medium transition-all"
              >
                <Download className="w-4 h-4" /> Export PDF Report
              </button>
            </div>

            {/* Placeholder Dashboard - will be rich interactive UI */}
            <div className="glass rounded-3xl p-8 border border-white/10 mb-8">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🧬</div>
                <h3 className="text-2xl font-semibold mb-3">Full interactive dashboard coming in next commits</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Real parser, knowledge base, beautiful category cards, searchable SNP table, DNA animations, and PDF export are being added right now.
                </p>
              </div>
            </div>

            <div className="text-xs text-center text-slate-500">
              This is a live work-in-progress. The final experience will be stunning.
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* How it works */}
      <div className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="text-xs tracking-[2px] text-emerald-400 mb-2">HOW IT WORKS</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { icon: Upload, title: "Upload", desc: "Drop your raw .txt file. We detect 23andMe or MyHeritage automatically." },
            { icon: Dna, title: "Analyze Locally", desc: "70+ high-value SNPs are matched against a curated medical & wellness knowledge base — entirely in your browser." },
            { icon: Heart, title: "Explore & Export", desc: "Dive into interactive categories, simulate different genotypes, and download a polished personal report." },
          ].map((step, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/10">
              <step.icon className="w-6 h-6 text-emerald-400 mb-4" />
              <div className="font-semibold mb-2 text-lg">{step.title}</div>
              <div className="text-sm text-slate-400 leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Strong disclaimer footer */}
      <div className="border-t border-white/10 bg-black/30 py-8 text-center">
        <div className="max-w-2xl mx-auto px-6 text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Important:</strong> This tool is for educational and personal exploration purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always consult with a physician or certified genetic counselor. Genetic risk is complex and most conditions are multifactorial.
        </div>
      </div>
    </div>
  );
}
