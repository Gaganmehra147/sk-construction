"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  Plus,
  Trash2,
  X,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";
import LeadStatusUpdater from "../LeadStatusUpdater";

interface LeadNote {
  id: string;
  author: string;
  note: string;
  createdAt: string;
}

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  propertyType?: string | null;
  approxArea?: string | null;
  budgetRange: string;
  preferredStartDate?: string | null;
  message?: string | null;
  status: string;
  assignedTo?: string | null;
  createdAt: string;
  notes: LeadNote[];
}

interface LeadsClientCRMProps {
  initialLeads: LeadItem[];
}

export default function LeadsClientCRM({ initialLeads }: LeadsClientCRMProps) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [budgetFilter, setBudgetFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // Note creation inside modal
  const [newNoteText, setNewNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      search === "" ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    const matchesBudget = budgetFilter === "ALL" || l.budgetRange === budgetFilter;

    return matchesSearch && matchesStatus && matchesBudget;
  });

  const handleAddNote = async () => {
    if (!selectedLead || !newNoteText.trim()) return;
    setSavingNote(true);

    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newNote: newNoteText.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update state
        setLeads((prev) =>
          prev.map((item) => (item.id === selectedLead.id ? data.lead : item))
        );
        setSelectedLead(data.lead);
        setNewNoteText("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;

    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] p-4 border border-white/10">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-white/15 pl-10 pr-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono-tech text-stone-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-white/15 px-2 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="SITE_VISIT">Site Visit</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono-tech text-stone-400">
            <span>Budget:</span>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-white/15 px-2 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Budgets</option>
              <option value="Under ₹5 Lakh">Under ₹5 Lakh</option>
              <option value="₹5–10 Lakh">₹5–10 Lakh</option>
              <option value="₹10–20 Lakh">₹10–20 Lakh</option>
              <option value="₹20–50 Lakh">₹20–50 Lakh</option>
              <option value="₹50 Lakh+">₹50 Lakh+</option>
            </select>
          </div>
        </div>
      </div>

      {/* CRM Leads Table */}
      <div className="bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-[#1A1A1A] text-stone-400 uppercase text-[10px] font-mono-tech">
              <tr>
                <th className="p-3.5">Client Details</th>
                <th className="p-3.5">Scope & Location</th>
                <th className="p-3.5">Budget & Start</th>
                <th className="p-3.5">Date Received</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    No matching enquiries found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-[11px] text-stone-400">{lead.email}</div>
                      <div className="text-[11px] font-mono-tech text-[#C5A880]">
                        {lead.phone}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-white font-medium">{lead.projectType}</div>
                      <div className="text-[11px] text-stone-400">
                        {lead.propertyType || "Property"} • {lead.city}
                      </div>
                      {lead.approxArea && (
                        <div className="text-[10px] text-stone-500 font-mono-tech">
                          Area: {lead.approxArea}
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="text-[#C5A880] font-mono-tech font-medium">
                        {lead.budgetRange}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {lead.preferredStartDate || "Flexible"}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono-tech text-[11px] text-stone-400">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="p-3.5">
                      <LeadStatusUpdater
                        leadId={lead.id}
                        initialStatus={lead.status}
                      />
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1 bg-white/10 text-white hover:bg-[#C5A880] hover:text-[#121212] font-mono-tech text-[10px] uppercase transition-colors"
                      >
                        View & Notes ({lead.notes.length})
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1 text-stone-500 hover:text-red-400 transition-colors"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail & Follow-up Notes Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-[#141414] border-l border-white/15 h-full overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C5A880]">
                    ENQUIRY DOSSIER
                  </span>
                  <h3 className="font-serif-heading text-xl sm:text-2xl text-white font-bold">
                    {selectedLead.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-stone-400 hover:text-white transition-colors"
                  aria-label="Close dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct Quick Actions Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <a
                  href={`tel:${selectedLead.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech uppercase min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call {selectedLead.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                    selectedLead.name
                  )},%20this%20is%20SK%20Construction%20following%20up%20on%20your%20project%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-mono-tech uppercase hover:bg-[#25D366]/30 min-h-[44px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-[#1A1A1A] p-4 border border-white/5 text-xs">
                <div>
                  <span className="text-stone-500 font-mono-tech uppercase text-[10px] block">
                    Email
                  </span>
                  <span className="text-white">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono-tech uppercase text-[10px] block">
                    City
                  </span>
                  <span className="text-white">{selectedLead.city}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono-tech uppercase text-[10px] block">
                    Project Type
                  </span>
                  <span className="text-white">{selectedLead.projectType}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono-tech uppercase text-[10px] block">
                    Property Type
                  </span>
                  <span className="text-white">
                    {selectedLead.propertyType || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono-tech uppercase text-[10px] block">
                    Approx Area
                  </span>
                  <span className="text-white">
                    {selectedLead.approxArea || "Unspecified"}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 font-mono-tech uppercase text-[10px] block">
                    Budget Range
                  </span>
                  <span className="text-[#C5A880] font-mono-tech">
                    {selectedLead.budgetRange}
                  </span>
                </div>
              </div>

              {/* Client's Original Message */}
              {selectedLead.message && (
                <div className="space-y-2 bg-[#1A1A1A] p-4 border border-white/5">
                  <span className="text-stone-400 font-mono-tech uppercase text-[10px]">
                    Client Brief / Notes
                  </span>
                  <p className="text-stone-200 text-xs leading-relaxed italic">
                    &ldquo;{selectedLead.message}&rdquo;
                  </p>
                </div>
              )}

              {/* Follow-Up CRM Notes History */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-serif-heading text-base text-white">
                    Consultation & Follow-Up Log
                  </span>
                  <span className="text-[10px] font-mono-tech text-stone-400">
                    {selectedLead.notes.length} Recorded
                  </span>
                </div>

                {/* Add new note input */}
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Enter discussion summary, site visit outcome, or next action..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={savingNote || !newNoteText.trim()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {savingNote ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Log Note to CRM</span>
                  </button>
                </div>

                {/* Notes List */}
                <div className="space-y-2 pt-2">
                  {selectedLead.notes.length === 0 ? (
                    <div className="text-stone-500 text-xs italic py-2">
                      No follow-up notes recorded yet.
                    </div>
                  ) : (
                    selectedLead.notes.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 bg-[#1A1A1A] border border-white/5 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono-tech text-stone-400">
                          <span className="text-[#C5A880]">{n.author}</span>
                          <span>
                            {new Date(n.createdAt).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="text-xs text-stone-200 leading-relaxed">
                          {n.note}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => setSelectedLead(null)}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-stone-300 text-xs uppercase tracking-wider font-mono-tech"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
