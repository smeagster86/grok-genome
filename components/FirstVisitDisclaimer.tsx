"use client";

import { useState, useEffect } from "react";

/**
 * Global, calm first-visit disclaimer banner.
 * Reinforces core guardrails without hype or alarm.
 * Uses localStorage only (no genomic data stored).
 */
export function FirstVisitDisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("grok-genome-disclaimer-seen-v1");
    if (!seen) {
      // Small delay so it doesn't flash on initial paint
      const t = setTimeout(() => setVisible(true), 650);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem("grok-genome-disclaimer-seen-v1", "true");
    } catch {}
    setVisible(false);
  };

  return (
    <div className="border-b border-white/10 bg-[#0a0f1a]/95 backdrop-blur text-xs text-white/75">
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex-1 leading-snug">
          <span className="font-medium text-emerald-400/90">Note:</span> This is an educational exploration tool, not medical advice. All insights are probabilistic and represent one data point among many (clinical history, lifestyle, other genes, environment). Consumer genotyping has coverage and ancestry limitations. Discuss any findings with a qualified healthcare professional when appropriate. All analysis runs 100% locally in your browser.
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-[10px] font-medium hover:bg-white/5 transition"
        >
          I understand
        </button>
      </div>
    </div>
  );
}
