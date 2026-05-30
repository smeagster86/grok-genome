"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

interface VarianceCurvesProps {
  geneticLabel?: string;
  environmentLabel?: string;
  comparisonText?: string;
  height?: number;
}

// Improved data for smoother overlaid bell-curve appearance (more points, better gaussian-like falloff)
const curveData = [
  { x: -4.5, genetic: 0.01, env: 0.04 },
  { x: -4.0, genetic: 0.03, env: 0.07 },
  { x: -3.5, genetic: 0.08, env: 0.13 },
  { x: -3.0, genetic: 0.18, env: 0.22 },
  { x: -2.5, genetic: 0.35, env: 0.34 },
  { x: -2.0, genetic: 0.58, env: 0.48 },
  { x: -1.5, genetic: 0.78, env: 0.62 },
  { x: -1.0, genetic: 0.92, env: 0.74 },
  { x: -0.5, genetic: 0.98, env: 0.82 },
  { x: 0.0,  genetic: 1.00, env: 0.85 },
  { x: 0.5,  genetic: 0.98, env: 0.82 },
  { x: 1.0,  genetic: 0.92, env: 0.74 },
  { x: 1.5,  genetic: 0.78, env: 0.62 },
  { x: 2.0,  genetic: 0.58, env: 0.48 },
  { x: 2.5,  genetic: 0.35, env: 0.34 },
  { x: 3.0,  genetic: 0.18, env: 0.22 },
  { x: 3.5,  genetic: 0.08, env: 0.13 },
  { x: 4.0,  genetic: 0.03, env: 0.07 },
  { x: 4.5,  genetic: 0.01, env: 0.04 },
];

export function VarianceCurves({
  geneticLabel = "Genetic contribution (narrow slice)",
  environmentLabel = "Environment, behavior & clinical (broad)",
  comparisonText = "The genetic slice is typically tiny compared with modifiable factors.",
  height = 130,
}: VarianceCurvesProps) {
  return (
    <div className="mt-3 pt-3 border-t border-amber-500/30">
      <div className="text-[10px] uppercase tracking-widest text-amber-400/80 mb-1.5">
        Illustrative population distributions (educational toy model)
      </div>
      <div style={{ height }} className="w-full -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={curveData} margin={{ top: 4, right: 8, left: 8, bottom: 16 }}>
            <XAxis 
              dataKey="x" 
              tick={false} 
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              label={{ 
                value: "Illustrative effect on trait →", 
                position: "bottom", 
                offset: 4,
                style: { fontSize: "9px", fill: "rgba(255,255,255,0.4)" } 
              }} 
            />
            <YAxis hide />
            <Area 
              type="natural" 
              dataKey="env" 
              name={environmentLabel}
              fill="#f59e0b" 
              fillOpacity={0.30} 
              stroke="#f59e0b" 
              strokeWidth={1.5}
            />
            <Area 
              type="natural" 
              dataKey="genetic" 
              name={geneticLabel}
              fill="#10b981" 
              fillOpacity={0.68} 
              stroke="#10b981" 
              strokeWidth={1.5}
            />
            <Legend 
              verticalAlign="top" 
              height={18} 
              iconSize={8} 
              wrapperStyle={{ fontSize: "9px", color: "rgba(255,255,255,0.65)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-white/70 mt-1 leading-snug font-medium">
        {comparisonText}
      </div>
      <div className="text-[9px] text-white/40 mt-0.5">Narrow/sharp = genetic (small area). Wide/broad = environment + behavior + clinical (dominant). Overlaid for direct visual comparison.</div>
    </div>
  );
}
