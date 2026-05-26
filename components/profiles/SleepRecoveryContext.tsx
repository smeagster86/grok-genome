"use client";

import { useState } from "react";
import { EvidenceBadge } from "../EvidenceBadge";
import { MatchedInsight } from "@/lib/types";

interface SleepRecoveryContextProps {
  insights: MatchedInsight[];
}

export function SleepRecoveryContext({ insights }: SleepRecoveryContextProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Example sleep-related variants (if present in data)
  const clock = insights.find(i => i.snp.rsid === "rs1801260" || i.snp.rsid === "rs2305160");
  const per2 = insights.find(i => i.snp.rsid === "rs934945");

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
          Several common variants are associated with modest differences in sleep timing preferences, melatonin response, or recovery signals in studied populations. These are generally small effects and interact strongly with lifestyle, light exposure, and age.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">1. What might this mean?</div>
          <p className="text-sm text-white/80">
            Certain variants (e.g., in PER2, CLOCK, or melatonin-related genes) are linked with tendencies toward morning or evening chronotypes or slight differences in how the body responds to sleep cues in population studies.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">2. How strong is the evidence?</div>
          <p className="text-sm text-white/80">
            Moderate for chronotype associations. Evidence for direct impact on sleep quality or recovery is more limited and variable.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">3. Clinically established or exploratory?</div>
          <p className="text-sm text-white/80">
            Largely exploratory. These findings are not used in standard clinical sleep medicine except in rare cases.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">4. Meaningful effect on lifestyle or recovery?</div>
          <p className="text-sm text-white/80">
            These variants may contribute modestly as one factor among many that influence preferred sleep timing or how easily one adapts to shift work or jet lag. Sleep hygiene, consistent schedule, and light management usually have far greater impact.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50 mb-1">5. Actionable or worth discussing with a professional?</div>
          <p className="text-sm text-white/80">
            Rarely changes recommendations. Discuss with a clinician if you have persistent sleep difficulties, excessive daytime fatigue, or are considering melatonin supplementation for shift work or travel.
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4 text-xs">
          <div className="font-medium text-white/70 mb-2">Relevant SNPs in your data</div>
          <div className="text-white/60">
            CLOCK rs1801260 / rs2305160: {clock?.genotype || "—"} &nbsp;|&nbsp; PER2 rs934945: {per2?.genotype || "—"}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-[#0a0f1a] border border-white/10 p-4">
        <div className="text-xs font-medium text-white/60 mb-2">Limitations &amp; Context</div>
        <ul className="text-xs text-white/60 space-y-1 list-disc pl-4">
          <li>Most data comes from European-ancestry populations.</li>
          <li>Consumer arrays capture only a small fraction of relevant genetic variation.</li>
          <li>Sleep and recovery are heavily influenced by environment, stress, exercise, screen time, and overall health.</li>
          <li>This is educational context only — not a sleep disorder assessment.</li>
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
