"use client";

export type ViewMode = 'raw' | 'synthesized';

interface ProfileSelectorProps {
  currentView: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ProfileSelector({ currentView, onChange }: ProfileSelectorProps) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-[#111827] p-1">
      <button
        onClick={() => onChange('raw')}
        className={`px-4 py-1.5 text-sm rounded-[14px] transition-all ${currentView === 'raw' 
          ? 'bg-white text-[#0a0f1a] font-medium' 
          : 'text-white/70 hover:text-white'}`}
      >
        Raw SNPs
      </button>
      <button
        onClick={() => onChange('synthesized')}
        className={`px-4 py-1.5 text-sm rounded-[14px] transition-all ${currentView === 'synthesized' 
          ? 'bg-white text-[#0a0f1a] font-medium' 
          : 'text-white/70 hover:text-white'}`}
      >
        Synthesized Profiles
      </button>
    </div>
  );
}
