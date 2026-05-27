"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import Link from "next/link";
import { MatchedInsight } from "@/lib/types";

interface NutritionMetabolismContextProps {
  insights: MatchedInsight[];
}

export function NutritionMetabolismContext({ insights }: NutritionMetabolismContextProps) {
  const [showDetails, setShowDetails] = useState(false);

  const lct = insights.find(i => i.snp.rsid === "rs4988235");
  const caffeine = insights.find(i => i.snp.rsid === "rs762551");
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
          population="Evidence primarily from European-ancestry studies; applicability to other populations is limited or unknown."
        />
      </div>

      {/* Why This Profile Matters */}
      <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-white/80">
        <div className="font-medium text-emerald-400 mb-1 tracking-tight">Why This Profile Matters</div>
        <p>
          These variants influence how the body handles common dietary components and micronutrients that many people encounter daily. While none of them dictate an “optimal diet,” they can help explain why some individuals experience bloating with dairy, strong reactions to alcohol, or slower caffeine clearance — signals that are often more noticeable than subtler genetic effects.
        </p>
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
          Your data includes the {lct?.genotype === "GG" ? "GG genotype at LCT rs4988235 (associated with lower lactase persistence in many populations)" : "LCT rs4988235 genotype consistent with lactase persistence"} together with variants that have been linked in studies to caffeine clearance rate, alcohol sensitivity (especially the ALDH2 signal in East Asian populations), vitamin D receptor activity, and iron storage. Real-world experience with these foods and nutrients is shaped far more by total diet, gut health, and lifestyle than by any single genotype.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            The GG genotype at LCT rs4988235 is associated with reduced lactase persistence (lactose intolerance) in many populations. Variants in CYP1A2, ADH1B, ALDH2, VDR, and HFE have documented associations with caffeine metabolism rate, alcohol flush or sensitivity, vitamin D receptor activity, and iron storage (hemochromatosis risk in some contexts). The ALDH2 *2 signal is particularly strong in East Asian populations; most other signals were discovered primarily in European-ancestry cohorts.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate to strong for the primary associations (lactose persistence, alcohol flush in East Asian populations, HFE iron overload, caffeine metabolism). Effect sizes vary and are modified by environment and other genes. Many of the associations are reproducible in large GWAS but explain only a modest fraction of trait variance.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Some signals (HFE C282Y homozygosity for iron overload, ALDH2*2 for alcohol sensitivity) have clearer clinical implications. Most others remain exploratory for general wellness or personalized nutrition outside of specific clinical scenarios. Blood tests for nutrient status and clinical assessment of food tolerance remain the primary tools.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These variants can subtly influence tolerance or requirements for common foods and nutrients. They do not determine “optimal diet” or diagnose deficiencies. Diet quality, total intake, gut health, sun exposure, and overall health usually matter more than any single common variant.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            Worth discussing if you have symptoms (e.g., consistent bloating with dairy, alcohol reactions, fatigue with low sun exposure, family history of iron disorders). Validated blood tests remain the primary way to assess nutrient status. These genotypes are not a substitute for clinical laboratory evaluation.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs space-y-3">
          <div className="font-medium text-white/70 mb-1">Relevant SNPs in your data</div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">LCT rs4988235</div>
            <div className="text-white/60 mt-0.5">Genotype: {lct?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">GG associated with reduced lactase persistence and higher likelihood of adult lactose intolerance symptoms in many populations.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: Strong • Population-specific (stronger signal in some groups)</div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">CYP1A2 rs762551</div>
            <div className="text-white/60 mt-0.5">Genotype: {caffeine?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">CC (“slow” metabolizer) linked in studies to slower caffeine clearance; evening consumption may affect sleep more noticeably for some people.</div>
          </div>

          {aldh2 && (
            <div className="rounded-lg border border-white/10 p-3 bg-black/20">
              <div className="font-mono text-emerald-400">ALDH2 rs671 (*2)</div>
              <div className="text-white/60 mt-0.5">Genotype: {aldh2.genotype}</div>
              <div className="text-white/70 mt-1">Strong protective effect against heavy drinking in East Asian populations due to unpleasant flushing reaction; much weaker or absent signal in other ancestries.</div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most published data on these variants comes from European-ancestry populations, with some important exceptions (e.g., ALDH2 in East Asian populations).</li>
          <li>These SNPs explain only a portion of the heritability of the traits discussed; many other genes and environmental factors contribute.</li>
          <li>Nutrient status and food tolerance are heavily influenced by diet quality, gut microbiome, medications, and overall health.</li>
          <li>This profile does not replace clinical lab testing for nutrient levels or formal dietary assessment.</li>
          <li>Self-reported tolerance can be influenced by expectation, placebo/nocebo effects, and cultural dietary patterns.</li>
          <li>Genotype provides context at best — never a prescription for what to eat or avoid.</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-white/10 text-[11px]">
          <Link href="/#our-approach" className="text-emerald-400 hover:underline">Our Approach</Link>
          <span className="mx-1.5 text-white/30">·</span>
          <Link href="/for-clinicians" className="text-emerald-400 hover:underline">For Clinicians guidance</Link>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-white/40">One data point among many. Always interpret alongside clinical information and professional guidance.</div>
    </div>
  );
}
