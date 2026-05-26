"use client";

import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

interface MethylationSupportProps {
  insights: MatchedInsight[];
}

export function MethylationSupport({ insights }: MethylationSupportProps) {
  // Find relevant SNPs from the user's results
  const mthfr677 = insights.find(i => i.snp.rsid === "rs1801133");
  const mthfr1298 = insights.find(i => i.snp.rsid === "rs1801131");

  // Simple synthesis logic (client-side)
  const hasReducedEfficiency =
    (mthfr677?.genotype === "GG" || mthfr677?.genotype === "AG") ||
    (mthfr1298?.genotype === "CC" || mthfr1298?.genotype === "AC");

  const combinedGenotype = [mthfr677?.genotype, mthfr1298?.genotype]
    .filter(Boolean)
    .join(" / ") || "No data";

  return (
    <div className="glass rounded-3xl border border-white/10 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="uppercase tracking-[2px] text-xs text-emerald-400 mb-1">SYNTHESIZED PROFILE</div>
          <h3 className="text-2xl font-semibold tracking-tight">Methylation Support</h3>
          <p className="text-sm text-white/60 mt-1">Folate metabolism efficiency indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate evidence"
          effect="Variable impact"
          ancestry="Population-specific"
          status="Exploratory context"
        />
      </div>

      {/* Simple Summary - Progressive Disclosure Level 1 */}
      <div className="mb-6 rounded-2xl bg-black/30 p-5">
        <div className="text-sm text-white/70 mb-2">Your profile summary</div>
        <p className="text-base leading-relaxed">
          {hasReducedEfficiency
            ? "Evidence suggests a tendency toward reduced MTHFR efficiency. This is associated with lower folate processing capacity in studied populations."
            : "Your combination is consistent with typical MTHFR efficiency in the reference populations."
          }
        </p>
      </div>

      {/* Core Answers - The 5 Questions */}
      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">What this might mean</div>
          <p className="text-sm text-white/80">
            MTHFR helps convert folate into its active form. Reduced activity (especially the GG or CC genotypes) is associated with higher homocysteine levels in many studies, though effect sizes vary widely by individual and diet.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Strength of evidence</div>
          <p className="text-sm text-white/80">
            Moderate. The genetic association is well replicated, but clinical outcomes are highly influenced by diet, B-vitamin status, and other genes.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Is this actionable?</div>
          <p className="text-sm text-white/80">
            Potentially. Some people with reduced-efficiency genotypes benefit from methylated folate supplements or higher dietary folate intake. This is an area of active research.
          </p>
        </div>

        <div className="pt-3 border-t border-white/10">
          <div className="text-xs uppercase tracking-widest text-amber-400 mb-1">Guardrail</div>
          <p className="text-sm text-white/70">
            Discuss with a clinician if you have symptoms of low folate status, elevated homocysteine on bloodwork, or are considering supplementation — especially if pregnant or planning pregnancy.
          </p>
        </div>
      </div>

      {/* Limitations Panel */}
      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Results are based on common MTHFR variants only. Rare variants are not captured in standard consumer testing.</li>
          <li>Most data comes from European-ancestry studies; applicability to other populations is less certain.</li>
          <li>Diet, lifestyle, and other genes have a much larger impact on actual methylation status than these variants alone.</li>
          <li>This is not a diagnosis of any condition.</li>
        </ul>
      </div>

      <div className="mt-4 text-[10px] text-white/40">This profile is synthesized from your raw data using the current knowledge base. It is for educational purposes only.</div>
    </div>
  );
}
