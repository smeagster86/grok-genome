"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

interface NutritionMetabolismContextProps {
  insights: MatchedInsight[];
}

export function NutritionMetabolismContext({ insights }: NutritionMetabolismContextProps) {
  const [showDetails, setShowDetails] = useState(false);

  const caffeine = insights.find(i => i.snp.rsid === "rs762551");
  const lactose = insights.find(i => i.snp.rsid === "rs4988235");
  const adh1b = insights.find(i => i.snp.rsid === "rs1229984");
  const aldh2 = insights.find(i => i.snp.rsid === "rs671");
  const vdr = insights.find(i => i.snp.rsid === "rs2228570");
  const hfe = insights.find(i => i.snp.rsid === "rs1800562");

  return (
    <div className="glass rounded-3xl border border-white/10 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="uppercase tracking-[2px] text-xs text-emerald-400 mb-1">SYNTHESIZED PROFILE</div>
          <h3 className="text-2xl font-semibold tracking-tight">Nutrition &amp; Metabolism Context</h3>
          <p className="text-sm text-white/60 mt-1">Common dietary and metabolic indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Variable Impact"
          ancestry="Population-specific"
          status="Mostly Exploratory"
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs px-3 py-1 rounded-full border border-white/15 hover:bg-white/5 transition"
        >
          {showDetails ? "Simple view" : "Show detailed SNPs"}
        </button>
      </div>

      <div className="mb-6 rounded-2xl bg-black/30 p-5">
        <div className="text-sm text-white/70 mb-2">Your profile summary</div>
        <p className="text-base leading-relaxed">
          Several common variants are associated with differences in how people metabolize or tolerate certain dietary components (caffeine, lactose, alcohol) and nutrients (vitamin D, iron) in studied populations. Effects are generally modest and highly context-dependent.
        </p>
      </div>

      {/* Core Questions */}
      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            Variants like rs762551 (CYP1A2) are associated with slower caffeine clearance in some populations. rs4988235 (LCT) relates to lactase persistence. Alcohol-related genes (ADH1B, ALDH2) and nutrient genes (VDR, HFE) show population-level differences in metabolism or sensitivity.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate for several of these signals (caffeine, lactose persistence, alcohol flush in East Asians). Evidence for clinical or lifestyle recommendations based on these variants alone remains limited for most people.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Mostly exploratory outside of specific high-risk populations (e.g., ALDH2*2 and alcohol in East Asians). Not routinely used for personalized nutrition advice in clinical practice.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These can influence tolerance or requirements for specific substances. Overall dietary patterns, gut health, and total nutrient intake usually matter far more than these individual variants.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            Rarely changes general recommendations. May be relevant for people experiencing strong side effects from caffeine/alcohol or with specific bloodwork abnormalities (e.g., iron studies, vitamin D levels).
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs">
          <div className="font-medium text-white/70 mb-2">Relevant SNPs in your data</div>
          <ul className="text-white/60 space-y-1">
            <li>Caffeine (CYP1A2 rs762551): {caffeine?.genotype || "—"}</li>
            <li>Lactose (LCT rs4988235): {lactose?.genotype || "—"}</li>
            <li>Alcohol (ADH1B rs1229984 / ALDH2 rs671): {adh1b?.genotype || "—"} / {aldh2?.genotype || "—"}</li>
            <li>Vitamin D (VDR rs2228570): {vdr?.genotype || "—"}</li>
            <li>Iron (HFE rs1800562): {hfe?.genotype || "—"}</li>
          </ul>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Many of these associations are population-specific and do not predict individual response reliably.</li>
          <li>Consumer genotyping provides limited resolution for some of these genes.</li>
          <li>Nutrition and metabolism are multifactorial — genetics is only one small piece.</li>
        </ul>
      </div>

      <div className="mt-4 text-[10px] text-white/40">Educational context only. One data point among many.</div>
    </div>
  );
}
