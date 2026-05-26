"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

interface NutritionMetabolismContextProps {
  insights: MatchedInsight[];
}

export function NutritionMetabolismContext({ insights }: NutritionMetabolismContextProps) {
  const [showDetails, setShowDetails] = useState(false);

  const lct = insights.find(i => i.snp.rsid === "rs4988235");
  const fto = insights.find(i => i.snp.rsid === "rs9939609");
  const tcf7l2 = insights.find(i => i.snp.rsid === "rs7903146");
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
          <p className="text-sm text-white/60 mt-1">Lactose, caffeine, alcohol, vitamin D, iron</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Small-to-Modest Effects"
          ancestry="European-biased"
          status="Exploratory"
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
          Several well-studied variants influence how the body handles common dietary components (lactose, caffeine, alcohol) and micronutrients (vitamin D, iron storage). These are among the more reproducible signals in consumer genomic data, though real-world impact always depends on diet, overall health, and many other factors.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            The GG genotype at LCT rs4988235 is associated with reduced lactase persistence (lactose intolerance) in many populations. Variants in CYP1A2, ADH1B, ALDH2, VDR, and HFE have documented associations with caffeine metabolism rate, alcohol flush or sensitivity, vitamin D receptor activity, and iron storage (hemochromatosis risk in some contexts).
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate to strong for the primary associations (lactose persistence, alcohol flush in East Asian populations, HFE iron overload, caffeine metabolism). Effect sizes vary and are modified by environment and other genes.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Some signals (HFE C282Y homozygosity for iron overload, ALDH2*2 for alcohol sensitivity) have clearer clinical implications. Most others remain exploratory for general wellness or personalized nutrition outside of specific clinical scenarios.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These variants can subtly influence tolerance or requirements for common foods and nutrients. They do not determine "optimal diet" or diagnose deficiencies. Diet quality, total intake, gut health, and sun exposure usually matter more.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            Worth discussing if you have symptoms (e.g., consistent bloating with dairy, alcohol reactions, fatigue with low sun exposure, family history of iron disorders). Validated blood tests remain the primary way to assess nutrient status.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs">
          <div className="font-medium text-white/70 mb-2">Relevant SNPs in your data</div>
          <div className="text-white/60">
            LCT rs4988235: {lct?.genotype || "—"} &nbsp;|&nbsp; CYP1A2 rs762551: {caffeine?.genotype || "—"}
            {adh1b && ` &nbsp;|&nbsp; ADH1B rs1229984: ${adh1b.genotype}`}
            {aldh2 && ` &nbsp;|&nbsp; ALDH2 rs671: ${aldh2.genotype}`}
            {vdr && ` &nbsp;|&nbsp; VDR rs2228570: ${vdr.genotype}`}
            {hfe && ` &nbsp;|&nbsp; HFE rs1800562: ${hfe.genotype}`}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most published data on these variants comes from European-ancestry populations, with some important exceptions (e.g., ALDH2 in East Asian populations).</li>
          <li>These SNPs explain only a portion of the heritability of the traits discussed.</li>
          <li>Nutrient status and food tolerance are heavily influenced by diet quality, gut microbiome, medications, and overall health.</li>
          <li>This profile does not replace clinical lab testing for nutrient levels or formal dietary assessment.</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-white/10 text-[11px]">
          <a href="/#our-approach" className="text-emerald-400 hover:underline">Our Approach</a>
          <span className="mx-1.5 text-white/30">·</span>
          <a href="/for-clinicians" className="text-emerald-400 hover:underline">For Clinicians guidance</a>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-white/40">One data point among many. Always interpret alongside clinical information and professional guidance.</div>
    </div>
  );
}
