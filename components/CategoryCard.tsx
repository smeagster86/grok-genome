"use client";
import { motion } from "framer-motion";
import { Heart, Users, Zap, Activity, BookOpen } from "lucide-react";
import { Category, MatchedInsight } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/knowledgeBase";

const iconMap: any = { Heart, Users, Zap, Activity, BookOpen };

interface Props {
  category: Category;
  insights: MatchedInsight[];
  isActive: boolean;
  onClick: () => void;
}

export function CategoryCard({ category, insights, isActive, onClick }: Props) {
  const meta = CATEGORY_LABELS[category];
  const Icon = iconMap[meta.icon] || Heart;
  const count = insights.length;
  const highImpact = insights.filter(i => ['increased_risk','non_responder','affected'].includes(i.interpretation.effect)).length;

  return (
    <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.985 }} onClick={onClick}
      className={`category-card text-left w-full p-5 rounded-3xl border bg-[#111827] flex flex-col gap-3 transition-all ${isActive ? 'active border-emerald-500' : 'border-white/10 hover:border-white/30'}`}
    >
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-2xl" style={{ backgroundColor: `${meta.color}15` }}>
          <Icon className="w-5 h-5" style={{ color: meta.color }} />
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold tabular-nums tracking-tighter text-white/90">{count}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/50 -mt-1">variants</div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg tracking-tight pr-2 leading-none mb-1.5">{meta.label}</div>
        <div className="text-xs text-white/60">{highImpact > 0 ? `${highImpact} flagged` : 'Mostly typical range'}</div>
      </div>
      <div className="mt-auto pt-2 text-[11px] text-white/40 flex items-center gap-1">Tap to filter →</div>
    </motion.button>
  );
}
