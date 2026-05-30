"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface VarianceCurvesProps {
  geneticLabel?: string;
  environmentLabel?: string;
  comparisonText?: string;
  height?: number;
}

const curveData = [
  { x: -4, genetic: 0.04, env: 0.07 },
  { x: -3, genetic: 0.18, env: 0.18 },
  { x: -2, genetic: 0.55, env: 0.38 },
  { x: -1, genetic: 0.88, env: 0.62 },
  { x: 0,  genetic: 1.0,  env: 0.82 },
  { x: 1,  genetic: 0.88, env: 0.62 },
  { x: 2,  genetic: 0.55, env: 0.38 },
  { x: 3,  genetic: 0.18, env: 0.18 },
  { x: 4,  genetic: 0.04, env: 0.07 },
];

export function VarianceCurves({
  geneticLabel = "Genetic contribution (narrow slice)",
  environmentLabel = "Environment, behavior & clinical (broad)",
  comparisonText = "The genetic slice is typically tiny compared with modifiable factors.",
  height = 125,
}: VarianceCurvesProps) {
  return (
    <div className="mt-3 pt-3 border-t border-amber-500/30">
      <div className="text-[10px] uppercase tracking-widest text-amber-400/80 mb-1.5">
        Illustrative population distributions (educational)
      </div>
      <div style={{ height }} className="w-full -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={curveData} margin={{ top: 5, right: 6, left: 6, bottom: 18 }}>
            <XAxis 
              dataKey="x" 
              tick={false} 
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              label={{ 
                value: "Illustrative effect on trait →", 
                position: "bottom", 
                offset: 6,
                style: { fontSize: "9px", fill: "rgba(255,255,255,0.35)" } 
              }} 
            />
            <YAxis hide />
            <Area 
              type="natural" 
              dataKey="env" 
              name={environmentLabel}
              fill="#f59e0b" 
              fillOpacity={0.26} 
              stroke="#f59e0b" 
              strokeWidth={1.5}
            />
            <Area 
              type="natural" 
              dataKey="genetic" 
              name={geneticLabel}
              fill="#10b981" 
              fillOpacity={0.62} 
              stroke="#10b981" 
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-white/65 mt-1 leading-snug">
        {comparisonText}
      </div>
      <div className="text-[9px] text-white/40 mt-0.5">Overlaid: genetic (sharp, small area) vs. environment/behavior (wide, dominant). Purely illustrative toy model.</div>
    </div>
  );
}
