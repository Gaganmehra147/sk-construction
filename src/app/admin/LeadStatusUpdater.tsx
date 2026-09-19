"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface LeadStatusUpdaterProps {
  leadId: string;
  initialStatus: string;
}

const STATUS_OPTIONS = [
  { value: "NEW", label: "New", color: "bg-amber-900/40 text-amber-300 border-amber-700/50" },
  { value: "CONTACTED", label: "Contacted", color: "bg-blue-900/40 text-blue-300 border-blue-700/50" },
  { value: "QUALIFIED", label: "Qualified", color: "bg-purple-900/40 text-purple-300 border-purple-700/50" },
  { value: "SITE_VISIT", label: "Site Visit", color: "bg-cyan-900/40 text-cyan-300 border-cyan-700/50" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent", color: "bg-indigo-900/40 text-indigo-300 border-indigo-700/50" },
  { value: "WON", label: "Won", color: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50" },
  { value: "LOST", label: "Lost", color: "bg-stone-800 text-stone-400 border-stone-700" },
];

export default function LeadStatusUpdater({
  leadId,
  initialStatus,
}: LeadStatusUpdaterProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      // Revert if error
      setStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  const currentOption =
    STATUS_OPTIONS.find((o) => o.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={status}
        disabled={loading}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`px-2 py-1 text-[11px] font-mono-tech uppercase border rounded-none cursor-pointer focus:outline-none ${currentOption.color}`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#181818] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {loading && <Loader2 className="w-3 h-3 text-[#C5A880] animate-spin" />}
      {saved && <Check className="w-3 h-3 text-emerald-400" />}
    </div>
  );
}
