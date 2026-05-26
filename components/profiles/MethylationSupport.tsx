"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import Link from "next/link";
import { MatchedInsight } from "@/lib/types";

interface MethylationSupportProps {
  insights: MatchedInsight[];
}

export function MethylationSupport({ insights }: MethylationSupportProps) {
  const [showDetails, setShowDetails] = useState(false);

  const mthfr677 = insights.find(i => i.snp.rsid === "rs1801133");
  const mthfr1298 = insights.find(i => i.snp.rsid === "rs1801131");

  const has677Risk = mthfr677?.genotype === "GG" || mthfr677?.genotype === "AG";
  const has1298Risk = mthfr1298?.genotype === "CC" || mthfr1298?.genotype === "AC";

  const combined = [mthfr677?.genotype, mthfr1298?.genotype].filter(Boolean).join(" / ") || "No relevant data";

  return (
    <div className="glass rounded-3xl border border-white/10 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="uppercase tracking-[2px] text-xs text-emerald-400 mb-1">SYNTHESIZED PROFILE</div>
          <h3 className="text-2xl font-semibold tracking-tight">Methylation Support</h3>
          <p className="text-sm text-white/60 mt-1">Folate-related pathway indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Small-to-Modest Effects"
          ancestry="European-biased"
          status="Exploratory"
        />
      </div>

      {/* Why This Profile Matters */}
      <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-white/80">
        <div className="font-medium text-emerald-400 mb-1 tracking-tight">Why This Profile Matters</div>
        <p>
          Variants in the folate pathway are among the most studied in consumer genomics because they can subtly influence homocysteine levels and one-carbon metabolism. These shifts have been examined in relation to cardiovascular risk, pregnancy outcomes, and mood regulation, though real-world impact is almost always modified by diet, B-vitamin status, and many other genes.
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
          {has677Risk || has1298Risk
            ? "Your data shows the GG genotype at MTHFR rs1801133 (C677T) and/or the CC/AC combination at rs1801131 (A1298C). In studied populations this pattern is associated with a modest reduction in MTHFR enzyme activity compared with the most common reference genotypes. The actual biological consequence varies widely between individuals and depends heavily on dietary folate intake and other factors."
            : "Your genotype combination at these two positions is consistent with typical activity in the reference populations studied."
          }
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            Certain common variants in the MTHFR gene are associated with differences in how the body processes folate in laboratory and population studies. The GG genotype at rs1801133 and the CC genotype at rs1801131 are each linked to modestly lower enzyme activity in some research, though real-world effects depend heavily on diet and other factors. Most published data come from European-ancestry cohorts; effect sizes in other populations remain less precisely quantified.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate. The association between these variants and reduced enzyme function in controlled settings is well replicated. However, the downstream effects on health outcomes show more variable results across studies. Many large meta-analyses note substantial heterogeneity, and publication bias toward positive findings cannot be ruled out.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Largely exploratory for general wellness purposes. While these variants are among the most studied in consumer genomics, major medical organizations currently do not recommend routine testing or specific interventions based on MTHFR genotype alone for most people. Clinical guidelines emphasize measuring actual nutrient status over genotyping.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These variants may contribute modestly as one factor among many that influence folate status. Diet (especially intake of natural folates and fortified foods), overall B-vitamin status, and other genetic and lifestyle factors typically have larger effects. The impact of any single genotype is usually small relative to total dietary and environmental context.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            In most cases these findings do not change clinical recommendations. Discuss with a clinician if you have relevant symptoms, abnormal bloodwork (such as elevated homocysteine), or are considering high-dose supplementation, particularly during pregnancy planning. Blood levels of folate, B12, and homocysteine remain the primary clinical tools.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs space-y-3">
          <div className="font-medium text-white/70 mb-1">Relevant SNPs in your data</div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">MTHFR rs1801133 (C677T)</div>
            <div className="text-white/60 mt-0.5">Genotype: {mthfr677?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">Associated with modestly lower MTHFR enzyme activity in functional studies when homozygous or compound heterozygous.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: Moderate • European-biased • One factor among many</div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">MTHFR rs1801131 (A1298C)</div>
            <div className="text-white/60 mt-0.5">Genotype: {mthfr1298?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">Milder effect in isolation; combined with 677T often shows additive reduction in activity in laboratory models.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: Moderate • European-biased • Context-dependent</div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most published data on these variants comes from European-ancestry populations. Applicability to other ancestries is less well studied.</li>
          <li>These two SNPs do not capture all genetic variation that can affect folate metabolism (e.g., DHFR, RFC1, and many rarer variants are not well tagged on consumer arrays).</li>
          <li>Real-world methylation status is strongly influenced by diet quality, B12 status, medications (e.g., methotrexate, certain anticonvulsants), gut microbiome, and lifestyle.</li>
          <li>Enzyme activity measured in vitro does not always translate directly to clinical outcomes in free-living people.</li>
          <li>This profile does not measure actual homocysteine, folate, or B-vitamin levels — blood testing remains the gold standard.</li>
          <li>This profile is for educational and informational purposes only. It is not medical advice or a diagnostic tool.</li>
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
