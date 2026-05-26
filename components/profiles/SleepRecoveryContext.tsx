"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import Link from "next/link";
import { MatchedInsight } from "@/lib/types";

interface SleepRecoveryContextProps {
  insights: MatchedInsight[];
}

export function SleepRecoveryContext({ insights }: SleepRecoveryContextProps) {
  const [showDetails, setShowDetails] = useState(false);

  const clock = insights.find(i => i.snp.rsid === "rs1801260" || i.snp.rsid === "rs2305160");
  const per2 = insights.find(i => i.snp.rsid === "rs934945");
  const mtnr1b = insights.find(i => i.snp.rsid === "rs10830963");

  return (
    <div className="glass rounded-3xl border border-white/10 p-7">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="uppercase tracking-[2px] text-xs text-emerald-400 mb-1">SYNTHESIZED PROFILE</div>
          <h3 className="text-2xl font-semibold tracking-tight">Sleep &amp; Recovery Context</h3>
          <p className="text-sm text-white/60 mt-1">Circadian and recovery-related indicators</p>
        </div>
        <EvidenceBadge
          level="Moderate Evidence"
          effect="Modest Influence"
          ancestry="Population-specific"
          status="Exploratory"
        />
      </div>

      {/* Why This Profile Matters */}
      <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-white/80">
        <div className="font-medium text-emerald-400 mb-1 tracking-tight">Why This Profile Matters</div>
        <p>
          Sleep timing preference and recovery are highly polygenic and heavily shaped by light exposure, age, social schedules, and stress. Common variants can produce small shifts in chronotype or melatonin signaling in population studies, but they almost never override lifestyle factors and explain only a modest fraction of individual differences.
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
          Several common variants are associated with modest differences in sleep timing preferences, melatonin response, or recovery signals in studied populations. In your data, {clock ? `the ${clock.genotype} genotype at CLOCK ${clock.snp.rsid}` : "no strong CLOCK signal"} and {per2 ? `the ${per2.genotype} genotype at PER2 rs934945` : "no PER2 rs934945 signal"} are present. These are generally small effects that interact strongly with lifestyle, light exposure, age, and social jet-lag.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            Certain variants (e.g., in PER2, CLOCK, or melatonin-related genes) are linked with tendencies toward morning or evening chronotypes or slight differences in how the body responds to sleep cues in population studies. Most large discovery cohorts have been European-ancestry; effect sizes in other populations are less well characterized. The variants do not determine sleep quality or diagnose disorders.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate for chronotype associations. Evidence for direct impact on sleep quality or recovery is more limited and variable. Polygenic risk scores for chronotype explain only a small percentage of variance; the majority of differences remain environmental and behavioral.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Largely exploratory. These findings are not used in standard clinical sleep medicine except in rare cases. Clinical sleep medicine relies primarily on history, sleep diaries, actigraphy, and (when indicated) polysomnography rather than common-variant genotyping.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or recovery?</div>
          <p className="text-sm text-white/80">
            These variants may contribute modestly as one factor among many that influence preferred sleep timing or how easily one adapts to shift work or jet lag. Sleep hygiene, consistent schedule, light management, and age usually have far greater impact. The variants do not override lifestyle or guarantee better or worse recovery.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            Rarely changes recommendations. Discuss with a clinician if you have persistent sleep difficulties, excessive daytime fatigue, or are considering melatonin supplementation for shift work or travel. Clinical evaluation of sleep disorders follows established guidelines that do not rely on these common SNPs.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs space-y-3">
          <div className="font-medium text-white/70 mb-1">Relevant SNPs in your data</div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">CLOCK rs1801260 / rs2305160</div>
            <div className="text-white/60 mt-0.5">Genotype: {clock?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">Associated in some studies with modest shifts in circadian preference or sleep timing; effect sizes are small and highly context-dependent.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: Moderate • Population-specific • Small effect</div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 bg-black/20">
            <div className="font-mono text-emerald-400">PER2 rs934945</div>
            <div className="text-white/60 mt-0.5">Genotype: {per2?.genotype || "—"}</div>
            <div className="text-white/70 mt-1">Linked in GWAS to evening chronotype tendency; most signals discovered in European-ancestry cohorts.</div>
            <div className="mt-1 text-[10px] text-white/50">Evidence: Moderate GWAS • Small effect • Highly polygenic trait</div>
          </div>

          {mtnr1b && (
            <div className="rounded-lg border border-white/10 p-3 bg-black/20">
              <div className="font-mono text-emerald-400">MTNR1B rs10830963</div>
              <div className="text-white/60 mt-0.5">Genotype: {mtnr1b.genotype}</div>
              <div className="text-white/70 mt-1">Melatonin receptor variant associated in some studies with modest differences in sleep timing and metabolic signals; effect is small and modified by many other factors.</div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most data comes from European-ancestry populations; effect sizes and allele frequencies can differ substantially in other groups.</li>
          <li>Consumer arrays capture only a small fraction of relevant genetic variation; sleep is highly polygenic.</li>
          <li>Sleep and recovery are heavily influenced by environment, stress, exercise, screen time, age, and overall health — usually far more than common variants.</li>
          <li>This is educational context only — not a sleep disorder assessment or diagnostic tool.</li>
          <li>Chronotype and sleep quality are strongly modifiable by light hygiene, consistent schedules, and behavioral factors.</li>
          <li>No common SNP profile replaces a clinical sleep evaluation when symptoms are present.</li>
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
