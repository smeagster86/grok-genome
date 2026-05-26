"use client";

import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

interface MethylationSupportProps {
  insights: MatchedInsight[];
}

export function MethylationSupport({ insights }: MethylationSupportProps) {
  const mthfr677 = insights.find(i => i.snp.rsid === "rs1801133");
  const mthfr1298 = insights.find(i => i.snp.rsid === "rs1801131");

  // Very conservative synthesis - only what the data supports
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

      {/* Summary - Progressive Disclosure */}
      <div className="mb-6 rounded-2xl bg-black/30 p-5">
        <div className="text-sm text-white/70 mb-2">Your profile summary</div>
        <p className="text-base leading-relaxed">
          {has677Risk || has1298Risk
            ? "Evidence suggests a possible tendency toward modestly lower activity in the folate pathway in studied populations, particularly when both variants are present. Actual biological impact varies significantly between individuals."
            : "Your genotype combination at these two positions is consistent with typical activity in the reference populations studied."
          }
        </p>
      </div>

      {/* The Five Core Questions - Strict Structure */}
      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            Certain common variants in the MTHFR gene are associated with differences in how the body processes folate in laboratory and population studies. The GG genotype at rs1801133 and the CC genotype at rs1801131 are each linked to modestly lower enzyme activity in some research, though real-world effects depend heavily on diet and other factors.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate. The association between these variants and reduced enzyme function in controlled settings is well replicated. However, the downstream effects on health outcomes show more variable results across studies.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Largely exploratory for general wellness purposes. While these variants are among the most studied in consumer genomics, major medical organizations currently do not recommend routine testing or specific interventions based on MTHFR genotype alone for most people.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These variants may contribute modestly as one factor among many that influence folate status. Diet (especially intake of natural folates and fortified foods), overall B-vitamin status, and other genetic and lifestyle factors typically have larger effects.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            In most cases these findings do not change clinical recommendations. Discuss with a clinician if you have relevant symptoms, abnormal bloodwork (such as elevated homocysteine), or are considering high-dose supplementation, particularly during pregnancy planning.
          </p>
        </div>
      </div>

      {/* Limitations Panel */}
      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most published data on these variants comes from European-ancestry populations. Applicability to other ancestries is less well studied.</li>
          <li>These two SNPs do not capture all genetic variation that can affect folate metabolism.</li>
          <li>Real-world methylation status is strongly influenced by diet, lifestyle, medications, and many other genes.</li>
          <li>This profile is for educational and informational purposes only. It is not medical advice or a diagnostic tool.</li>
        </ul>
      </div>

      <div className="mt-4 text-[10px] text-white/40">One data point among many. Always interpret alongside clinical information and professional guidance.</div>
    </div>
  );
}
