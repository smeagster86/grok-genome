"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

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
          <p className="text-sm text-white/60 mt-1">Common pharmacogene indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Variable Clinical Impact"
          ancestry="Mixed / European-biased"
          status="Context-Dependent"
        />
      </div>

      {/* Why This Profile Matters */}
      <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-white/80">
        <div className="font-medium text-emerald-400 mb-1 tracking-tight">Why This Profile Matters</div>
        <p>
          A small number of well-characterized variants can meaningfully alter how the body activates or clears specific medications. When present, they may influence prescribing choices for clopidogrel, warfarin, or certain chemotherapies, but most important pharmacogenes (especially CYP2D6 and CYP3A4 star alleles) are poorly or incompletely captured on consumer arrays.
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
          In your data, {cyp2c19?.genotype === "AA" ? "the AA genotype at CYP2C19 rs4244285 is present (poor metabolizer for certain substrates)" : "CYP2C19 rs4244285 shows a non-AA genotype"} and {vkorc1?.genotype === "AA" ? "the AA genotype at VKORC1 rs9923231 is present (increased warfarin sensitivity signal)" : "VKORC1 rs9923231 shows a non-AA genotype"}. These are among the better-tagged pharmacogenetic signals on consumer chips, but many other clinically relevant variants remain invisible or poorly imputed.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            The AA genotype at rs4244285 in CYP2C19 is associated with reduced activation of certain medications (such as clopidogrel) in multiple studies. The AA genotype at rs9923231 in VKORC1 is associated with increased sensitivity to warfarin. These are among the better-characterized pharmacogenetic signals in consumer data, but they represent only a narrow slice of the genes that matter for drug response.
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
            These variants can influence how certain medications are processed. They do not generally affect "metabolism" in the broader wellness sense (energy, weight, etc.). Effects are highly drug-specific and are almost always modified by age, liver and kidney function, concomitant medications, and adherence.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            For clopidogrel and warfarin, these results may be relevant to prescribing decisions in some cases. Discuss with your prescriber or pharmacist if you are currently taking or may be prescribed these medications. Do not change any medication based on this profile alone. Clinical pharmacogenetic testing with a validated panel remains the appropriate route when medication response is a concern.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs space-y-3">
          <div className="font-medium text-white/70 mb-1">Relevant SNPs in your data</div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">CYP2C19 rs4244285 (*2)</div>
            <div className="text-white/60 mt-0.5">Genotype: {cyp2c19?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">Poor or intermediate metabolizer status for several substrates when AA or AG; clopidogrel activation is the most commonly discussed clinical example.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: High (CPIC/FDA) • Actionable for specific drugs • Many other PGx genes not well covered on consumer chips</div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">VKORC1 rs9923231</div>
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
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most consumer arrays have limited or no reliable coverage for CYP2D6 and CYP3A4 star alleles, which are important for many common medications (antidepressants, opioids, statins, etc.).</li>
          <li>Even for well-studied genes, real-world response is also influenced by age, liver/kidney function, other medications, adherence, and non-genetic factors.</li>
          <li>Many important pharmacogenetic variants are rare, ancestry-specific, or poorly tagged on standard consumer chips.</li>
          <li>This profile covers only a small subset of pharmacogenes and medications. It is not a substitute for clinical pharmacogenetic testing or professional medical advice.</li>
          <li>Genotype alone does not determine the best drug or dose — therapeutic drug monitoring and clinical judgment remain essential.</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-white/10 text-[11px]">
          <a href="/#our-approach" className="text-emerald-400 hover:underline">Our Approach</a>
          <span className="mx-1.5 text-white/30">·</span>
          <a href="/for-clinicians" className="text-emerald-400 hover:underline">For Clinicians guidance</a>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-white/40">Context-dependent findings. Always consult your prescriber before making any medication changes.</div>
    </div>
  );
}
