"use client";

export function OurApproach() {
  return (
    <div id="our-approach" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/10">
      <div className="text-center mb-10">
        <div className="uppercase tracking-[3px] text-xs text-emerald-400 mb-2">OUR APPROACH</div>
        <h2 className="text-4xl tracking-[-1.4px] font-semibold">Our Approach: Transparent, Probabilistic, Privacy-First Genomic Context</h2>
      </div>

      <div className="max-w-3xl mx-auto text-lg text-white/80 space-y-6">
        <p>
          Grok Genome exists to help you responsibly understand your consumer genomic data — never to diagnose, predict disease, or replace professional medical advice.
        </p>

        <p className="font-medium text-white">We follow four non-negotiable commitments:</p>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-xl mb-2 text-white">1. Your DNA Never Leaves Your Device</h3>
            <p className="text-white/70">
              All core interpretation runs locally in your browser. No data is uploaded by default. You control any optional exports or sharing. Full offline capability is supported.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2 text-white">2. Probabilistic and Humble Language Only</h3>
            <p className="text-white/70">
              We never say “you have,” “causes,” “will,” or “risk of.” Instead:
            </p>
            <ul className="list-disc list-inside mt-2 text-white/70 space-y-1 pl-4">
              <li>“This variant is associated with a modest shift in [trait] in studied populations.”</li>
              <li>“Evidence suggests a possible tendency toward…”</li>
            </ul>
            <p className="mt-2 text-white/70">
              Every statement includes context on effect size, evidence strength, and limitations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2 text-white">3. Scientific Transparency as a Feature</h3>
            <p className="text-white/70">
              Every finding shows: evidence level, effect size (where known), ancestry considerations, and replication status.
              We explicitly note European bias common in many GWAS and reduced reliability for other ancestries.
              Sources and limitations are one click away.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2 text-white">4. Clear Guardrails</h3>
            <p className="text-white/70">
              Findings are framed as one data point among many (lifestyle, environment, clinical history). We surface “Discuss with a healthcare professional if…” triggers where effect size or user context suggests it may be relevant. We do not provide medical advice.
            </p>
          </div>
        </div>

        <p className="pt-6 text-sm text-white/60 border-t border-white/10">
          We draw inspiration from responsible frameworks such as GA4GH principles for genomic data and emphasize that consumer genomics remains largely exploratory outside of specific, clinically validated applications.
        </p>
      </div>

      {/* Privacy Hero Block */}
      <div className="mt-16 max-w-2xl mx-auto rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <div className="uppercase tracking-widest text-xs text-emerald-400 mb-3">PRIVACY BY DESIGN</div>
        <div className="text-2xl font-semibold tracking-tight mb-4">Your DNA never leaves this device.</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-white/70">
          <div>100% local-first processing</div>
          <div>No account required for core use</div>
          <div>Optional encrypted exports (you decide)</div>
        </div>
        <div className="mt-4 text-xs text-white/50">Full transparency: see exactly what runs where</div>
      </div>
    </div>
  );
}
