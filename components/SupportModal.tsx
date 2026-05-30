"use client";

import { useState } from "react";
import { X, Heart, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: Props) {
  const [supportTotal, setSupportTotal] = useState(347); // Demo starting value

  const handleSupport = (amount: number) => {
    const newTotal = supportTotal + amount;
    setSupportTotal(newTotal);
    localStorage.setItem('grok_genome_support_total', newTotal.toString());
    toast.success(`Thank you! +$${amount} recorded (demo). Real payments coming soon.`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="bg-[#111827] border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white p-2 -m-2 rounded-full hover:bg-white/5 transition"
          aria-label="Close support dialog"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <Heart className="text-emerald-400 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <div className="font-semibold text-xl sm:text-2xl tracking-tight">Support Grok Genome</div>
            <div className="text-sm text-white/60">Keep this tool free, private, and improving</div>
          </div>
        </div>

        <div className="bg-black/30 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 text-center">
          <div className="text-xs uppercase tracking-widest text-white/50">Community support so far</div>
          <div className="text-4xl sm:text-5xl font-semibold tabular-nums tracking-[-2px] text-emerald-400 mt-1">${supportTotal}</div>
          <div className="text-xs text-white/50 mt-1">(demo counter — real automation coming)</div>
        </div>

        <div className="space-y-4">
          <div className="border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="font-medium mb-2 text-sm sm:text-base">One-time Support</div>
            <div className="text-sm text-white/80 mb-3">
              Support the project with a one-time payment. All core features remain free forever.
            </div>
            <a 
              href="https://buy.stripe.com/YOUR_UNIQUE_PAYMENT_LINK_HERE" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-emerald-500 text-[#0a0f1a] font-medium hover:bg-emerald-600 w-full justify-center"
            >
              Support via Stripe <ExternalLink size={15} />
            </a>
            <div className="text-[10px] text-white/50 mt-2">Replace the link above with your private Stripe/Lemon Squeezy Payment Link.</div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-4 sm:p-5">
            <div className="font-medium mb-1 text-emerald-400 text-sm sm:text-base">Premium Insights (Coming Soon)</div>
            <div className="text-sm text-white/80 mb-3">Supporters will unlock 200+ additional SNPs, advanced simulators, and priority features.</div>
            <a 
              href="https://buy.stripe.com/YOUR_PREMIUM_LINK_HERE" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-emerald-500 text-[#0a0f1a] font-medium hover:bg-emerald-600 w-full justify-center sm:w-auto"
            >
              Unlock Premium <ExternalLink size={15} />
            </a>
          </div>

          <div className="text-xs text-white/60">
            For crypto or e-Transfer, use the support link above or reach out privately.
          </div>
        </div>

        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={() => handleSupport(5)} className="flex-1 py-3 rounded-2xl border border-white/15 hover:bg-white/5 text-sm min-h-[44px]">I supported $5</button>
          <button onClick={() => handleSupport(10)} className="flex-1 py-3 rounded-2xl border border-white/15 hover:bg-white/5 text-sm min-h-[44px]">I supported $10</button>
          <button onClick={() => handleSupport(25)} className="flex-1 py-3 rounded-2xl bg-emerald-500 text-[#0a0f1a] font-medium text-sm min-h-[44px]">I supported $25+</button>
        </div>

        <div className="text-center text-[10px] text-white/40 mt-5 sm:mt-6">Your support keeps the project alive, private, and improving for everyone.</div>
      </div>
    </div>
  );
}
