"use client";

import { useState } from "react";
import { Save, Check, Loader2 } from "lucide-react";

interface StatItem {
  id: string;
  key: string;
  label: string;
  value: string;
  suffix?: string | null;
}

export default function StatsEditorClient({
  initialStats,
}: {
  initialStats: StatItem[];
}) {
  const [items, setItems] = useState<StatItem[]>(initialStats);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (id: string, field: "label" | "value" | "suffix", val: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/stats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="bg-[#141414] border border-white/10 p-6 space-y-6">
        <div className="space-y-4">
          {items.map((stat) => (
            <div
              key={stat.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-[#1A1A1A] border border-white/5 items-center"
            >
              <div className="sm:col-span-5">
                <label className="text-[10px] font-mono-tech uppercase text-stone-400 block mb-1">
                  Metric Title
                </label>
                <input
                  type="text"
                  required
                  value={stat.label}
                  onChange={(e) => handleChange(stat.id, "label", e.target.value)}
                  className="w-full bg-[#121212] border border-white/15 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="text-[10px] font-mono-tech uppercase text-stone-400 block mb-1">
                  Metric Number Value
                </label>
                <input
                  type="text"
                  required
                  value={stat.value}
                  onChange={(e) => handleChange(stat.id, "value", e.target.value)}
                  className="w-full bg-[#121212] border border-white/15 px-3 py-2 text-xs text-[#C5A880] font-mono-tech font-bold"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] font-mono-tech uppercase text-stone-400 block mb-1">
                  Suffix Symbol
                </label>
                <input
                  type="text"
                  value={stat.suffix || ""}
                  onChange={(e) => handleChange(stat.id, "suffix", e.target.value)}
                  placeholder="e.g. +"
                  className="w-full bg-[#121212] border border-white/15 px-3 py-2 text-xs text-white font-mono-tech"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          {saved && (
            <span className="text-xs text-emerald-400 font-mono-tech flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Statistics successfully updated across live website!</span>
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Trust Metrics</span>
        </button>
      </div>
    </form>
  );
}
