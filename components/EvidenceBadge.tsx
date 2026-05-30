"use client";

interface EvidenceBadgeProps {
  level?: string;
  effect?: string;
  ancestry?: string;
  status?: string;
  population?: string;
  className?: string;
}

const evidenceConfig: Record<string, { color: string; description: string }> = {
  high: {
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Strong, replicated evidence from multiple independent studies.',
  },
  moderate: {
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description: 'Good support from studies; effect sizes often modest.',
  },
  preliminary: {
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    description: 'Limited or emerging data. Interpret with caution.',
  },
  research: {
    color: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    description: 'Primarily for scientific interest.',
  },
};

export function EvidenceBadge({ 
  level, 
  effect, 
  ancestry, 
  status, 
  population,
  className = '' 
}: EvidenceBadgeProps) {
  const parts = [level, effect, ancestry, status, population].filter(Boolean);
  if (parts.length === 0) return null;

  const text = parts.join(' • ');

  const lowerLevel = (level || '').toLowerCase();
  const config = evidenceConfig[lowerLevel] || evidenceConfig['moderate'];

  return (
    <span 
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${config.color} ${className}`}
      title={text}
      aria-label={`${text}. ${config.description}`}
    >
      {text}
    </span>
  );
}

interface EvidenceLegendProps {
  className?: string;
}

export function EvidenceLegend({ className = '' }: EvidenceLegendProps) {
  return (
    <div className={`text-xs text-white/60 space-y-2 ${className}`}>
      <div className="font-medium text-white/80 mb-1.5">Evidence Badge Guide</div>
      <div className="grid gap-y-1.5">
        <div><strong>Strong GWAS / HIGH</strong> — Multiple independent studies with consistent direction.</div>
        <div><strong>Modest Effect</strong> — Typical for common variants; small contribution to overall trait.</div>
        <div><strong>European-biased</strong> — Most data from European-ancestry cohorts; lower confidence in other populations.</div>
        <div><strong>Population applicability</strong> — Evidence primarily from European-ancestry studies; applicability to other populations is limited or unknown.</div>
        <div><strong>Exploratory / Preliminary</strong> — Not used in standard medical guidelines. For research/education only.</div>
      </div>
      <div className="pt-1 text-[10px] text-white/50">All interpretations are probabilistic and should be discussed with a qualified healthcare professional when relevant.</div>
    </div>
  );
}
