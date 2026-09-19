"use client";

import { useState } from "react";
import { Save, Check, Loader2, Globe } from "lucide-react";

interface SeoSettingItem {
  id: string;
  pageKey: string;
  title: string;
  description: string;
  ogImage?: string | null;
  keywords?: string | null;
}

export default function SeoEditorClient({
  initialSeo,
}: {
  initialSeo: SeoSettingItem[];
}) {
  const [items, setItems] = useState<SeoSettingItem[]>(initialSeo);
  const [activeTab, setActiveTab] = useState(items[0]?.pageKey || "homepage");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentItem = items.find((i) => i.pageKey === activeTab) || items[0];

  const handleChange = (field: keyof SeoSettingItem, val: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.pageKey === activeTab ? { ...item, [field]: val } : item
      )
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
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
      {/* Page Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {items.map((item) => (
          <button
            key={item.pageKey}
            type="button"
            onClick={() => setActiveTab(item.pageKey)}
            className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-wider transition-colors ${
              activeTab === item.pageKey
                ? "bg-[#C5A880] text-[#121212] font-semibold"
                : "text-stone-400 hover:text-white bg-[#141414]"
            }`}
          >
            {item.pageKey}
          </button>
        ))}
      </div>

      {currentItem && (
        <div className="bg-[#141414] border border-white/10 p-6 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-[#C5A880] font-mono-tech uppercase pb-2 border-b border-white/10">
            <Globe className="w-4 h-4" />
            <span>Target Route: /{currentItem.pageKey === "homepage" ? "" : currentItem.pageKey}</span>
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Browser Title Tag (&lt;title&gt;) *
            </label>
            <input
              type="text"
              required
              value={currentItem.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Meta Description *
            </label>
            <textarea
              rows={3}
              required
              value={currentItem.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              OpenGraph Social Share Image URL
            </label>
            <input
              type="text"
              value={currentItem.ogImage || ""}
              onChange={(e) => handleChange("ogImage", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Target SEO Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={currentItem.keywords || ""}
              onChange={(e) => handleChange("keywords", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div>
          {saved && (
            <span className="text-xs text-emerald-400 font-mono-tech flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>SEO settings updated successfully!</span>
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
          <span>Save Page SEO</span>
        </button>
      </div>
    </form>
  );
}
