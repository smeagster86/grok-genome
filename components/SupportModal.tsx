"use client";

import { useState } from "react";
import { X, Heart, Copy, ExternalLink } from "lucide-react";
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

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="bg-[#111827] border border-white/10 rounded-3xl max-w-lg w-full p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Heart className="text-emerald-400" />
          <div>
            <div className="font-semibold text-2xl tracking-tight">Support Grok Genome</div>
            <div className="text-sm text-white/60">Keep this tool free, private, and improving</div>
          </div>
        </div>

        <div className="bg-black/30 rounded-2xl p-5 mb-6 text-center">
          <div className="text-xs uppercase tracking-widest text-white/50">Community support so far</div>
          <div className="text-5xl font-semibold tabular-nums tracking-[-2px] text-emerald-400 mt-1">${supportTotal}</div>
          <div className="text-xs text-white/50 mt-1">(demo counter — real automation coming)</div>
        </div>

        <div className="space-y-4">
          {/* E-transfer */}
          <div className="border border-white/10 rounded-2xl p-5">
            <div className="font-medium mb-1 flex items-center gap-2">🇨🇦 Interac e-Transfer (Canada)</div>
            <div className="font-mono text-emerald-400">suranjan.brg@gmail.com</div>
            <div className="text-xs text-white/60 mt-1">Add note: "Grok Genome support"</div>
            <button onClick={() => copy('suranjan.brg@gmail.com', 'Email')} className="mt-3 text-xs flex items-center gap-1.5 text-emerald-400 hover:underline">
              <Copy size={14} /> Copy email
            </button>
          </div>

          {/* Crypto */}
          <div className="border border-white/10 rounded-2xl p-5 text-sm">
            <div className="font-medium mb-3">Crypto Donations</div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-white/60 mb-0.5">Bitcoin (BTC)</div>
                <div className="font-mono text-emerald-400 break-all">bc1qrgqt2m3t02lc8m735wjnvxpuwsmfxvhs87j4ls</div>
                <button onClick={() => copy('bc1qrgqt2m3t02lc8m735wjnvxpuwsmfxvhs87j4ls', 'Bitcoin address')} className="mt-1 text-emerald-400 underline flex items-center gap-1">
                  <Copy size={13} /> Copy BTC address
                </button>
              </div>

              <div>
                <div className="text-white/60 mb-0.5">Ethereum (ETH) + ERC-20 tokens</div>
                <div className="font-mono text-emerald-400 break-all">0xb3C751B577d1131c2395fE53a34C8a7466ce68BF</div>
                <button onClick={() => copy('0xb3C751B577d1131c2395fE53a34C8a7466ce68BF', 'Ethereum address')} className="mt-1 text-emerald-400 underline flex items-center gap-1">
                  <Copy size={13} /> Copy ETH address
                </button>
              </div>
            </div>
            <div className="text-[10px] text-white/50 mt-3 leading-snug">Double-check the address before sending. Only use the correct network.</div>
          </div>

          {/* Future Stripe / Premium */}
          <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-5">
            <div className="font-medium mb-1 text-emerald-400">Premium Insights (Coming Soon)</div>
            <div className="text-sm text-white/80 mb-3">Supporters will unlock 200+ additional SNPs, advanced polygenic simulators, and priority features.</div>
            <a href="https://buy.stripe.com/YOUR_LINK_HERE" target="_blank" className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-emerald-500 text-[#0a0f1a] font-medium hover:bg-emerald-600">
              Support with Stripe <ExternalLink size={14} />
            </a>
            <div className="text-[10px] text-white/50 mt-2">Replace with your real Stripe/Lemon Squeezy payment link.</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => handleSupport(5)} className="flex-1 py-3 rounded-2xl border border-white/15 hover:bg-white/5 text-sm">I sent $5</button>
          <button onClick={() => handleSupport(10)} className="flex-1 py-3 rounded-2xl border border-white/15 hover:bg-white/5 text-sm">I sent $10</button>
          <button onClick={() => handleSupport(25)} className="flex-1 py-3 rounded-2xl bg-emerald-500 text-[#0a0f1a] font-medium text-sm">I sent $25+</button>
        </div>

        <div className="text-center text-[10px] text-white/40 mt-6">All core features remain free forever. Your support keeps the project alive and private.</div>
      </div>
    </div>
  );
}
