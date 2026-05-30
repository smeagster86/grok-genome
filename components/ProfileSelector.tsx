"use client";

export type ViewMode = 'raw' | 'synthesized';

interface ProfileSelectorProps {
  currentView: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ProfileSelector({ currentView, onChange }: ProfileSelectorProps) {
  return (
    <div className="inline-flex w-full sm:w-auto rounded-2xl border border-white/10 bg-[#111827] p-1 flex-col sm:flex-row gap-1 sm:gap-0">
      <button
        onClick={() => onChange('raw')}
        className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-sm rounded-[14px] transition-all text-center ${currentView === 'raw' 
          ? 'bg-white text-[#0a0f1a] font-medium' 
          : 'text-white/70 hover:text-white'}`}
        aria-pressed={currentView === 'raw'}
      >
        Raw SNPs
      </button>
      <button
        onClick={() => onChange('synthesized')}
        className={`flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-sm rounded-[14px] transition-all text-center ${currentView === 'synthesized' 
          ? 'bg-white text-[#0a0f1a] font-medium' 
          : 'text-white/70 hover:text-white'}`}
        aria-pressed={currentView === 'synthesized'}
      >
        Synthesized Profiles
      </button>
    </div>
  );
}
