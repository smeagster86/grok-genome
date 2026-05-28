import Link from "next/link";

export default function ForClinicians() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="text-emerald-400 hover:underline text-sm">&larr; Back to Grok Genome</Link>
        </div>

        <div className="mb-10">
          <div className="uppercase tracking-[3px] text-xs text-emerald-400 mb-2">FOR CLINICIANS</div>
          <h1 className="text-4xl font-semibold tracking-tight">Grok Genome for Healthcare Professionals</h1>
          <p className="mt-3 text-lg text-white/70 max-w-2xl">
            A private, local-first tool to help patients contextualize consumer genomic data responsibly.
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-white/80 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Purpose &amp; Framing</h2>
            <p>
              Many patients now arrive with raw DNA data from direct-to-consumer tests. Grok Genome helps them explore that data privately, without uploading it anywhere. It is <strong>not</strong> a diagnostic tool, a clinical decision support system, or a replacement for validated clinical genetic testing.
            </p>
            <p>
              Use it as a conversation starter. It can surface patterns worth discussing, but every finding must be interpreted in the full clinical context of the patient.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-white">How Patients Might Use It</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Review synthesized profiles (e.g., methylation support, drug metabolism tendencies, nutrition context) in plain language.</li>
              <li>Generate clean, shareable exports (PDF, Markdown, structured data) to bring to an appointment.</li>
              <li>Explore “what if” genotype simulations for educational purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Recommended Approach When Reviewing Patient Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Always treat findings as exploratory.</strong> Consumer-grade genotyping has known limitations in coverage, accuracy for certain variants, and population bias (most data is European-ancestry derived).</li>
              <li><strong>Focus on the five core questions</strong> the tool tries to answer for every profile: What might this mean? How strong is the evidence? Established or exploratory? Meaningful effect? Worth discussing with a professional?</li>
              <li><strong>Emphasize multifactorial context.</strong> Diet, lifestyle, medications, other genes, and clinical history almost always matter more than any single variant or small set of variants.</li>
              <li><strong>Use the Limitations panels.</strong> Every synthesized profile includes explicit limitations and ancestry notes.</li>
              <li><strong>Do not base clinical decisions on this tool alone.</strong> If a finding seems relevant, consider validated clinical testing, pharmacogenetic panels, or referral to genetics where appropriate.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Privacy &amp; Data Handling</h2>
            <p>
              All core analysis runs 100% in the browser. No genomic data is uploaded to any server by default. Patients control any exports. This is one of the tool’s strongest features for patients concerned about genetic privacy.
            </p>
            <p className="text-sm text-white/60">
              You can review the full “Our Approach to Responsible Interpretation” on the main site, which details the probabilistic language standards, evidence transparency, and guardrails built into the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Practical Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ask patients to bring exports (PDF or Markdown) rather than raw files when possible.</li>
              <li>Review the Evidence Legend and Limitations sections together.</li>
              <li>Use the “Discuss with a clinician if…” guardrails as natural conversation starters.</li>
              <li>Document in the chart that consumer genomic data was reviewed and that findings were discussed in the context of overall clinical care (not as standalone diagnostic results).</li>
            </ul>
          </section>

          {/* Integrated full Ancestry & PRS Limitations section (expert synthesis) */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Ancestry &amp; PRS Limitations</h2>
            <p>
              Most genetic associations and polygenic risk signals in this report are derived primarily from studies in people of European ancestry. While some pharmacogenomic findings have reasonable portability across groups, many associations show reduced predictive power or different effect sizes when applied to individuals of African, East Asian, South Asian, Admixed American, or other ancestries.
            </p>
            <p>
              Polygenic risk scores (PRS) — even the best multi-ancestry versions available in 2026 — still perform substantially better in European-descent populations and can lose 30–70% or more of their accuracy outside those groups due to differences in allele frequencies, linkage disequilibrium, and environmental interactions.
            </p>
            <p className="text-sm text-white/60 mt-2">
              <strong>Important practical note:</strong> These results are one small, probabilistic data point among many. They should never replace clinical evaluation, family history, symptoms, or appropriate laboratory testing. If your self-identified or genetic ancestry differs from the primary study populations, some findings may be less reliable or not applicable. Always interpret this report together with a qualified clinician.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-white/60">
          <p>
            Grok Genome is an educational and exploratory tool. It is not a medical device and should not be used as the basis for clinical decisions in isolation.
          </p>
          <p className="mt-2">
            <Link href="/" className="text-emerald-400 hover:underline">Return to the main tool</Link> · <Link href="/#our-approach" className="text-emerald-400 hover:underline">Our Approach to Responsible Interpretation</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
