"use client";

interface EvidenceBadgeProps {
  level?: 'high' | 'moderate' | 'preliminary' | 'research';
  className?: string;
  showTooltip?: boolean;
}

const evidenceConfig = {
  high: {
    label: 'HIGH',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Strong GWAS: Multiple independent studies with consistent direction.',
  },
  moderate: {
    label: 'MODERATE',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'Moderate evidence: Good support from multiple studies, effect sizes often modest.',
  },
  preliminary: {
    label: 'PRELIMINARY',
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    description: 'Preliminary: Limited or emerging data. Interpret with caution.',
  },
  research: {
    label: 'RESEARCH',
    color: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    description: 'Research-grade: Primarily for scientific interest; not yet clinically actionable.',
  },
};

export function EvidenceBadge({ level, className = '', showTooltip = true }: EvidenceBadgeProps) {
  if (!level) return null;

  const config = evidenceConfig[level];

  const badge = (
    <span
      className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full border ${config.color} ${className}`}
      title={showTooltip ? config.description : undefined}
    >
      {config.label}
    </span>
  );

  return badge;
}

// Standalone legend for use in UI
interface EvidenceLegendProps {
  className?: string;
}

export function EvidenceLegend({ className = '' }: EvidenceLegendProps) {
  return (
    <div className={`text-xs text-white/60 space-y-2 ${className}`}>
      <div className="font-medium text-white/80 mb-1.5">Evidence Levels</div>
      <div className="grid gap-y-1.5">
        {Object.entries(evidenceConfig).map(([key, value]) => (
          <div key={key} className="flex items-start gap-2">
            <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border mt-px ${value.color}`}>
              {value.label}
            </span>
            <span className="leading-snug">{value.description}</span>
          </div>
        ))}
      </div>
      <div className="pt-1 text-[10px] text-white/50">All interpretations are probabilistic and should be discussed with a qualified healthcare professional when relevant.</div>
    </div>
  );
}
