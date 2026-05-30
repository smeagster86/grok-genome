"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import Link from "next/link";
import { MatchedInsight } from "@/lib/types";
import { VarianceCurves } from "../VarianceCurves";

interface DrugMetabolismTendenciesProps {
  insights: MatchedInsight[];
}

export function DrugMetabolismTendencies({ insights }: DrugMetabolismTendenciesProps) {
  const [showDetails, setShowDetails] = useState(false);

  const cyp2c19 = insights.find(i => i.snp.rsid === "rs4244285");
  const vkorc1 = insights.find(i => i.snp.rsid === "rs9923231");
  const cyp2c9 = insights.find(i => i.snp.rsid === "rs1799853");
  const ugt1a1 = insights.find(i => i.snp.rsid === "rs4148323");

  return (
    <div className="glass rounded-3xl border border-white/10 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="uppercase tracking-[2px] text-xs text-emerald-400 mb-1">SYNTHESIZED PROFILE</div>
          <h3 className="text-2xl font-semibold tracking-tight">Drug Metabolism Tendencies</h3>
          <p className="text-sm text-white/60 mt-1">Narrow educational view of common pharmacogene indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Variable Clinical Impact"
          ancestry="Mixed / European-biased"
          status="Context-Dependent"
          population="Evidence primarily from European-ancestry studies; applicability to other populations is limited or unknown."
        />
      </div>

      {/* Why This Profile Matters */}
      <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-white/80">
        <div className="font-medium text-emerald-400 mb-1 tracking-tight">Why This Profile Matters</div>
        <p>
          A small number of well-characterized variants can meaningfully alter how the body activates or clears specific medications. When present, they may influence prescribing choices for clopidogrel, warfarin, or certain chemotherapies, but most important pharmacogenes (especially CYP2D6 and CYP3A4 star alleles) are poorly or incompletely captured on consumer arrays.
        </p>
      </div>

      {/* Gene–Environment Dominance (Tier 1 per expert appraisals + grounded usefulness; Step 3 reframing: toy model + 90%+ clinical dominance) */}
      <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-white/80">
        <div className="font-medium text-amber-400 mb-1 tracking-tight">Gene–Environment Context</div>
        <p>
          This profile is a narrow educational illustration (toy model) using only the common pharmacogene variants that are reasonably well-tagged on consumer arrays. Real-world drug response is overwhelmingly shaped by age, liver and kidney function, concomitant medications, adherence, diet, comorbidities, microbiome, and other clinical factors — these typically explain the large majority (often 90%+) of variability. The signals surfaced here represent one small, probabilistic data point among many. This profile does not predict your actual response to any medication and is not a substitute for validated clinical pharmacogenetic testing or therapeutic drug monitoring.
        </p>
        <VarianceCurves
          geneticLabel="Common pharmacogene variants on arrays (narrow)"
          environmentLabel="Age, organ function, other drugs, adherence (broad)"
          comparisonText="Even for well-characterized pharmacogenes, real-world response is dominated by age, liver/kidney function, other medications, adherence, and comorbidities — the genetic slice is small by comparison."
          height={118}
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
          In your data, {cyp2c19?.genotype === "AA" ? "the AA genotype at CYP2C19 rs4244285 is present (poor metabolizer for certain substrates)" : "CYP2C19 rs4244285 shows a non-AA genotype"} and {vkorc1?.genotype === "AA" ? "the AA genotype at VKORC1 rs9923231 is present (increased warfarin sensitivity signal)" : "VKORC1 rs9923231 shows a non-AA genotype"}. This narrow panel of common variants provides limited educational context only. Many other clinically relevant variants (especially CYP2D6 and CYP3A4 star alleles) remain invisible or poorly imputed on consumer chips.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            The AA genotype at rs4244285 in CYP2C19 is associated with reduced activation of certain medications (such as clopidogrel) in multiple studies. The AA genotype at rs9923231 in VKORC1 is associated with increased sensitivity to warfarin. These are among the better-characterized pharmacogenetic signals in consumer data, but they represent only a narrow slice of the genes that matter for drug response. This profile functions as a toy model for education; it does not capture the full complexity of how you will respond to medications.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate to high for the specific drug-gene pairs mentioned (CYP2C19-clopidogrel and VKORC1-warfarin), with clinical guidelines from CPIC and FDA support. Evidence for many other drug-gene combinations remains more limited or exploratory, and consumer arrays have incomplete or no coverage for key genes such as CYP2D6 and CYP3A4 star alleles.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Established for a small number of specific drug-gene pairs with published guidelines. For most other medications, findings from consumer genomic data remain exploratory and are not currently part of routine prescribing in most clinical settings. Many important variants are rare, ancestry-specific, or not well tagged on standard arrays.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or metabolism?</div>
          <p className="text-sm text-white/80">
            These variants can influence how certain medications are processed. They do not generally affect “metabolism” in the broader wellness sense (energy, weight, etc.). Effects are highly drug-specific and are almost always modified by age, liver and kidney function, concomitant medications, adherence, and other clinical factors that typically dominate real-world response.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            For clopidogrel and warfarin, these results may be relevant to prescribing decisions in some cases. Discuss with your prescriber or pharmacist if you are currently taking or may be prescribed these medications. Do not change any medication based on this profile alone. Clinical pharmacogenetic testing with a validated panel remains the appropriate route when medication response is a concern. Adherence, timing, and other modifiable clinical factors usually matter more than the common variants captured here.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs space-y-3">
          <div className="font-medium text-white/70 mb-1">Relevant SNPs in your data</div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">CYP2C19 rs4244285 (*2) — Guideline-supported (CPIC/FDA)</div>
            <div className="text-white/60 mt-0.5">Genotype: {cyp2c19?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">Poor or intermediate metabolizer status for several substrates when AA or AG; clopidogrel activation is the most commonly discussed clinical example. Actionable per published guidelines.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: High (CPIC/FDA) • Actionable for specific drugs • Many other PGx genes not well covered on consumer chips</div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">VKORC1 rs9923231 — Guideline-supported (CPIC)</div>
            <div className="text-white/60 mt-0.5">Genotype: {vkorc1?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">AA genotype linked to lower dose requirement for warfarin; one of the stronger signals for anticoagulant dosing in guidelines.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: High (CPIC) • Context-dependent with CYP2C9 and clinical factors</div>
          </div>

          {cyp2c9 && (
            <div className="rounded-lg border border-white/10 p-3 bg-black/20">
              <div className="font-mono text-emerald-400">CYP2C9 rs1799853 (*2)</div>
              <div className="text-white/60 mt-0.5">Genotype: {cyp2c9.genotype}</div>
              <div className="text-white/70 mt-1">Reduced function allele that can affect warfarin dosing and NSAID metabolism in combination with other variants.</div>
            </div>
          )}

          <div className="rounded-lg border border-white/10 p-3 bg-black/20 mt-2">
            <div className="font-medium text-white/70 mb-1 text-xs">Other clinically important genes often poorly covered on consumer arrays (educational note)</div>
            <div className="text-[10px] text-white/60 leading-snug">
              DPYD (fluoropyrimidine toxicity — CPIC guidelines), TPMT/NUDT15 (thiopurine dosing), HLA-B*57:01 (abacavir hypersensitivity) and others can be highly actionable. These are frequently not reliably reported or imputed on standard direct-to-consumer chips. Clinical pharmacogenetic panels are required when relevant.
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>This profile is a narrow educational illustration (toy model) using only the common variants reasonably well-tagged on consumer arrays. It does not capture the full spectrum of pharmacogenetic variation relevant to drug response for most medications.</li>
          <li>Real-world drug response is overwhelmingly shaped by age, liver/kidney function, concomitant medications, adherence, comorbidities, diet, microbiome, and other clinical factors — typically explaining the large majority of variability. The variants shown here are one small probabilistic contribution at best.</li>
          <li>Most consumer arrays have limited or no reliable coverage for CYP2D6 and CYP3A4 star alleles, which are important for many common medications (antidepressants, opioids, statins, etc.).</li>
          <li>Even for well-studied genes, real-world response is also influenced by age, liver/kidney function, other medications, adherence, and non-genetic factors.</li>
          <li>Many important pharmacogenetic variants are rare, ancestry-specific, or poorly tagged on standard consumer chips.</li>
          <li>This profile covers only a small subset of pharmacogenes and medications. It is not a substitute for clinical pharmacogenetic testing or professional medical advice.</li>
          <li>Genotype alone does not determine the best drug or dose — therapeutic drug monitoring and clinical judgment remain essential. Modifiable factors such as adherence and timing of doses with your prescriber usually have greater practical impact.</li>
        </ul>

        {/* Slice 3: What this cannot tell you + gene × environment emphasis cards */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="font-medium text-emerald-400 mb-1 tracking-tight text-sm">What this cannot tell you</div>
          <p className="text-xs text-white/75 leading-snug">
            These variants (even the stronger ones like CYP2C19*2 and VKORC1) are one small probabilistic data point. This narrow consumer-array panel does not predict your actual response to any medication, nor does it replace validated clinical pharmacogenetic testing or therapeutic drug monitoring. Real-world outcomes are dominated by many non-genetic factors.
          </p>
          <div className="text-[10px] text-white/60 mt-1.5">
            Concrete levers that usually matter far more in practice:
            <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
              <li>Strict adherence and consistent timing with food/other meds</li>
              <li>Full current medication list review for interactions (with prescriber/pharmacist)</li>
              <li>Liver and kidney function status (major determinants of clearance)</li>
              <li>Diet, comorbidities, and microbiome effects on drug handling</li>
            </ul>
          </div>
          <div className="text-[10px] mt-1 text-emerald-400/80">For strong signals (CYP2C19, VKORC1), discuss CPIC/FDA guideline-based testing with your prescriber. See Nutrition profile for diet–drug interactions.</div>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-white/40">Context-dependent findings. Always consult your prescriber before making any medication changes.</div>
    </div>
  );
}
