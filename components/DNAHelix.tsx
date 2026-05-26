"use client";
import { motion } from "framer-motion";

interface DNAHelixProps {
  className?: string;
  speed?: number;
  active?: boolean;
}

export function DNAHelix({ className = "", speed = 1, active = true }: DNAHelixProps) {
  const pairs = 11;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg viewBox="0 0 120 420" className="w-full h-full" fill="none">
        {/* Backbones */}
        <motion.path
          d="M30 10 Q 55 55 30 100 Q 5 145 30 190 Q 55 235 30 280 Q 5 325 30 370 Q 55 415 30 410"
          stroke="#10b981"
          strokeWidth="3.5"
          strokeOpacity="0.35"
          animate={active ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 3.6 / speed, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M90 10 Q 65 55 90 100 Q 115 145 90 190 Q 65 235 90 280 Q 115 325 90 370 Q 65 415 90 410"
          stroke="#10b981"
          strokeWidth="3.5"
          strokeOpacity="0.35"
          animate={active ? { y: [0, 8, 0] } : {}}
          transition={{ duration: 3.6 / speed, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Base pairs */}
        {Array.from({ length: pairs }).map((_, i) => {
          const y = 22 + i * 33;
          const phase = (i % 2) * 0.6;
          return (
            <g key={i}>
              {/* Left to right rung */}
              <motion.line
                x1={32 + Math.sin(phase) * 6}
                y1={y}
                x2={88 - Math.sin(phase) * 6}
                y2={y}
                stroke={i % 3 === 0 ? "#34d399" : "#10b981"}
                strokeWidth={i % 4 === 0 ? "2.5" : "1.75"}
                strokeOpacity={0.75 + Math.sin(i) * 0.15}
                animate={active ? { 
                  x1: [32 + Math.sin(phase)*6, 35 + Math.sin(phase+1)*4, 32 + Math.sin(phase)*6],
                  x2: [88 - Math.sin(phase)*6, 85 - Math.sin(phase+1)*4, 88 - Math.sin(phase)*6] 
                } : {}}
                transition={{ duration: 2.8 / speed, delay: i * 0.03, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Small spheres */}
              <circle cx={32 + Math.sin(phase) * 6} cy={y} r="2.5" fill="#10b981" />
              <circle cx={88 - Math.sin(phase) * 6} cy={y} r="2.5" fill="#34d399" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
