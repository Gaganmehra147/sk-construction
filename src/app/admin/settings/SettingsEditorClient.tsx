"use client";

import { useState } from "react";
import { Save, Check, Loader2 } from "lucide-react";

export default function SettingsEditorClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
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
      {/* Brand & Telephony */}
      <div className="bg-[#141414] border border-white/10 p-6 space-y-4">
        <h3 className="font-serif-heading text-lg text-white font-semibold border-b border-white/10 pb-3">
          1. Brand Identity & Direct Telephony
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={settings.business_name || "SK Construction"}
              onChange={(e) => handleChange("business_name", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Brand Headline / Tagline
            </label>
            <input
              type="text"
              value={settings.tagline || "Spaces Designed To Be Lived In."}
              onChange={(e) => handleChange("tagline", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Primary Contact Phone
            </label>
            <input
              type="text"
              value={settings.phone || "+91 98765 43210"}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              WhatsApp Concierge Number
            </label>
            <input
              type="text"
              value={settings.whatsapp || "+91 98765 43210"}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Public Studio Email
            </label>
            <input
              type="email"
              value={settings.email || "contact@skconstruction.com"}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>

      {/* Office Coordinates & Working Hours */}
      <div className="bg-[#141414] border border-white/10 p-6 space-y-4">
        <h3 className="font-serif-heading text-lg text-white font-semibold border-b border-white/10 pb-3">
          2. Physical Address & Studio Coordinates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Physical Office Address
            </label>
            <input
              type="text"
              value={settings.address || "Plot 42, Architectural Enclave, Design District, New Delhi 110001"}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Hours of Operation
            </label>
            <input
              type="text"
              value={settings.working_hours || "Monday – Saturday: 9:30 AM – 7:00 PM"}
              onChange={(e) => handleChange("working_hours", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Google Maps Location Link
            </label>
            <input
              type="text"
              value={settings.google_maps_url || "https://maps.google.com"}
              onChange={(e) => handleChange("google_maps_url", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
              Footer Studio Bio
            </label>
            <textarea
              rows={3}
              value={settings.footer_bio || ""}
              onChange={(e) => handleChange("footer_bio", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          {saved && (
            <span className="text-xs text-emerald-400 font-mono-tech flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Studio settings saved and live!</span>
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
          <span>Save Studio Settings</span>
        </button>
      </div>
    </form>
  );
}
