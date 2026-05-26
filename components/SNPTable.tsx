"use client";
import { useState } from "react";
import { MatchedInsight } from "@/lib/types";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  insights: MatchedInsight[];
  activeCategory?: string;
  onSimulate?: (insight: MatchedInsight, newGenotype: string) => void;
}

export function SNPTable({ insights, activeCategory, onSimulate }: Props) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'trait' | 'effect'>('effect');

  let filtered = insights.filter(i => {
    const q = search.toLowerCase();
    return (
      i.snp.trait.toLowerCase().includes(q) ||
      i.snp.gene.toLowerCase().includes(q) ||
      i.snp.rsid.toLowerCase().includes(q)
    );
  });

  if (activeCategory) {
    filtered = filtered.filter(i => i.snp.category === activeCategory);
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortKey === 'effect') {
      const order: any = { increased_risk: 0, non_responder: 1, affected: 2, carrier: 3, neutral: 4, protective: 5 };
      return (order[a.interpretation.effect] ?? 99) - (order[b.interpretation.effect] ?? 99);
    }
    return a.snp.trait.localeCompare(b.snp.trait);
  });

  const toggleExpand = (rsid: string) => setExpanded(expanded === rsid ? null : rsid);

  if (filtered.length === 0) {
    return <div className="text-center py-10 text-sm text-white/60">No variants match your search.</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gene, trait, or rsid..."
            className="w-full bg-[#0a0f1a] border border-white/10 focus:border-emerald-500/60 rounded-2xl pl-11 py-3 text-sm placeholder:text-white/40 outline-none"
          />
        </div>
        <button 
          onClick={() => setSortKey(sortKey === 'effect' ? 'trait' : 'effect')}
          className="text-xs px-4 py-3 border border-white/10 hover:bg-white/5 rounded-2xl transition"
        >
          Sort: {sortKey === 'effect' ? 'Impact' : 'Trait'}
        </button>
      </div>

      <div className="space-y-2">
        {filtered.map((insight) => {
          const { snp, genotype, interpretation } = insight;
          const isOpen = expanded === snp.rsid;
          const effectColor =
            interpretation.effect.includes('risk') || interpretation.effect === 'non_responder' ? 'text-red-400' :
            interpretation.effect === 'protective' || interpretation.effect === 'decreased_risk' ? 'text-emerald-400' : 'text-amber-400';

          return (
            <div key={snp.rsid} className="snp-row bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">
              <div 
                onClick={() => toggleExpand(snp.rsid)}
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-mono text-xs tracking-widest text-emerald-400/90">{snp.rsid}</div>
                    <div className="font-semibold tracking-tight text-lg -mt-0.5">{snp.gene}</div>
                  </div>
                  <div className="text-sm text-white/70 max-w-[260px] leading-snug">{snp.trait}</div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="font-mono text-xl font-semibold tabular-nums tracking-[-1.5px]">{genotype}</div>
                    <div className={`text-xs uppercase font-medium ${effectColor}`}>{interpretation.effect.replace('_', ' ')}</div>
                  </div>
                  <div className="text-white/40">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>
              </div>

              {isOpen && (
                <div className="px-5 pb-6 pt-1 border-t border-white/10 bg-black/20 text-sm">
                  <div className="leading-relaxed text-white/90 mb-4">{interpretation.description}</div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Confidence: <span className="text-emerald-400 font-medium">{interpretation.confidence}</span></div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Source: {snp.source}</div>
                  </div>

                  {onSimulate && (
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/50 mb-2">EDUCATIONAL SIMULATOR — What if you had a different genotype?</div>
                      <div className="flex gap-2 flex-wrap">
                        {Object.keys(snp.genotypes).filter(g => g !== genotype).map(alt => (
                          <button
                            key={alt}
                            onClick={() => onSimulate(insight, alt)}
                            className="text-xs px-4 py-2 rounded-xl border border-white/15 hover:bg-emerald-500/10 hover:border-emerald-500/50 active:scale-[0.985] transition"
                          >
                            Simulate {alt} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-center text-white/40 mt-4">Click any row for full explanation and educational genotype simulator</div>
    </div>
  );
}
