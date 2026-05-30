"use client";

import { useState, useEffect } from "react";
import { X, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FeedbackEntry {
  ts: string;
  text: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_CHARS = 1000;

const STORAGE_KEY = 'grok-genome-feedback';

export function FeedbackModal({ isOpen, onClose }: Props) {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);

  // Load entries from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: FeedbackEntry[] = JSON.parse(raw);
          setEntries(Array.isArray(parsed) ? parsed : []);
        } else {
          setEntries([]);
        }
      } catch {
        setEntries([]);
      }
      setText("");
    }
  }, [isOpen]);

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canSubmit = text.trim().length > 0 && !isOverLimit;

  const handleSubmit = () => {
    if (!canSubmit) return;

    const newEntry: FeedbackEntry = {
      ts: new Date().toISOString(),
      text: text.trim(),
    };

    const updated = [newEntry, ...entries].slice(0, 20); // keep last 20

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEntries(updated);
      setText("");
      toast.success("Feedback saved locally (not sent). Thank you!");
    } catch {
      toast.error("Could not save feedback in this browser.");
    }
  };

  const copyEntry = (entry: FeedbackEntry) => {
    navigator.clipboard.writeText(entry.text).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  const deleteEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEntries(updated);
      toast.success("Entry removed");
    } catch {}
  };

  const clearAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setEntries([]);
      toast.success("All local feedback cleared");
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-[#111827] border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-auto" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/50 hover:text-white p-2 -m-2 rounded-full hover:bg-white/5 transition"
          aria-label="Close feedback"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="font-semibold text-2xl tracking-tight mb-1">Send Feedback</div>
          <div className="text-sm text-white/60">
            Feedback is saved only in your browser (localStorage). You can copy it later to email or share.
          </div>
        </div>

        {/* Compose area */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What could be better? What did you like? Any bugs or suggestions?"
            className="w-full h-32 resize-y bg-[#0a0f1a] border border-white/10 focus:border-emerald-500/60 rounded-2xl p-4 text-sm placeholder:text-white/40 outline-none"
            maxLength={MAX_CHARS + 50} // allow slight overflow for UX
          />
          <div className={`text-right text-xs mt-1 ${isOverLimit ? 'text-red-400' : 'text-white/50'}`}>
            {charCount} / {MAX_CHARS}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full py-3 rounded-2xl bg-emerald-500 text-[#0a0f1a] font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition"
        >
          Save Feedback Locally
        </button>

        {/* Previous entries */}
        {entries.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-white/80">Your previous feedback (local only)</div>
              <button 
                onClick={clearAll}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1"
              >
                <Trash2 size={13} /> Clear all
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-auto pr-1">
              {entries.map((entry, index) => (
                <div key={index} className="bg-black/30 border border-white/10 rounded-2xl p-4 text-sm">
                  <div className="text-[10px] text-white/50 mb-1">
                    {new Date(entry.ts).toLocaleString()}
                  </div>
                  <div className="text-white/90 whitespace-pre-wrap break-words">{entry.text}</div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => copyEntry(entry)}
                      className="text-xs px-3 py-1 rounded-lg border border-white/15 hover:bg-white/5 flex items-center gap-1"
                    >
                      <Copy size={12} /> Copy
                    </button>
                    <button 
                      onClick={() => deleteEntry(index)}
                      className="text-xs px-3 py-1 rounded-lg border border-white/15 hover:bg-white/5 text-red-400/80 hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-[10px] text-white/40 mt-6">
          Nothing is sent to any server. You control your data.
        </div>
      </div>
    </div>
  );
}
