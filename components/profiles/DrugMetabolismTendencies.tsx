"use client";

import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

interface DrugMetabolismTendenciesProps {
  insights: MatchedInsight[];
}

export function DrugMetabolismTendencies({ insights }: DrugMetabolismTendenciesProps) {
  const cyp2c19 = insights.find(i => i.snp.rsid === "rs4244285");
  const vkorc1 = insights.find(i => i.snp.rsid === "rs9923231");
  const cyp2c9 = insights.find(i => i.snp.rsid === "rs1799853");
  const ugt1a1 = insights.find(i => i.snp.rsid === "rs4148323");

  // Conservative synthesis - only based on available data
  const hasCyp2c19Risk = cyp2c19?.genotype === "AA";
  const hasVkorc1Sensitivity = vkorc1?.genotype === "AA";

  return (
    <div className="glass rounded-3xl border border-white/10 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="uppercase tracking-[2px] text-xs text-emerald-400 mb-1">SYNTHESIZED PROFILE</div>
          <h3 className="text-2xl font-semibold tracking-tight">Drug Metabolism Tendencies</h3>
          <p className="text-sm text-white/60 mt-1">Common pharmacogene indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Variable Clinical Impact"
          ancestry="Mixed / European-biased"
          status="Context-Dependent"
        />
      </div>

      <div className="mb-6 rounded-2xl bg-black/30 p-5">
        <div className="text-sm text-white/70 mb-2">Your profile summary</div>
        <p className="text-base leading-relaxed">
          Certain variants in genes involved in drug processing are associated with differences in how some medications are metabolized in studied populations. The actual clinical relevance depends on the specific drug, dose, and individual factors.
        </p>
      </div>

      {/* The Five Core Questions */}
      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            The AA genotype at rs4244285 in CYP2C19 is associated with reduced activation of certain medications (such as clopidogrel) in multiple studies. The AA genotype at rs9923231 in VKORC1 is associated with increased sensitivity to warfarin. These are among the better-characterized pharmacogenetic signals in consumer data.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate to high for the specific drug-gene pairs mentioned (CYP2C19-clopidogrel and VKORC1-warfarin), with clinical guidelines from CPIC and FDA support. Evidence for many other drug-gene combinations remains more limited or exploratory.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Established for a small number of specific drug-gene pairs with published guidelines. For most other medications, findings from consumer genomic data remain exploratory and are not currently part of routine prescribing in most clinical settings.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These variants can influence how certain medications are processed. They do not generally affect "metabolism" in the broader wellness sense (energy, weight, etc.). Effects are highly drug-specific.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            For clopidogrel and warfarin, these results may be relevant to prescribing decisions in some cases. Discuss with your prescriber or pharmacist if you are currently taking or may be prescribed these medications. Do not change any medication based on this profile alone.
          </p>
        </div>
      </div>

      {/* Limitations Panel */}
      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most consumer arrays have limited or no reliable coverage for CYP2D6 and CYP3A4 star alleles, which are important for many common medications.</li>
          <li>Even for well-studied genes, real-world response is also influenced by age, liver/kidney function, other medications, and non-genetic factors.</li>
          <li>Many important pharmacogenetic variants are rare or poorly tagged on standard consumer chips.</li>
          <li>This profile covers only a small subset of pharmacogenes and medications. It is not a substitute for clinical pharmacogenetic testing or professional medical advice.</li>
        </ul>
      </div>

      <div className="mt-4 text-[10px] text-white/40">Context-dependent findings. Always consult your prescriber before making any medication changes.</div>
    </div>
  );
}
