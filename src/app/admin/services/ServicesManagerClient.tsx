"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Check, X, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  number: string;
  name: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  coverImage: string;
  icon: string;
  isPublished: boolean;
  sortOrder: number;
}

export default function ServicesManagerClient({
  initialServices,
}: {
  initialServices: ServiceItem[];
}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    number: "",
    shortDesc: "",
    longDesc: "",
    coverImage: "",
    icon: "Compass",
    isPublished: true,
  });

  const openCreateModal = () => {
    setFormData({
      name: "",
      slug: "",
      number: `0${services.length + 1}`,
      shortDesc: "",
      longDesc: "",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
      icon: "Compass",
      isPublished: true,
    });
    setIsCreating(true);
    setEditingService(null);
  };

  const openEditModal = (service: ServiceItem) => {
    setFormData({
      name: service.name,
      slug: service.slug,
      number: service.number,
      shortDesc: service.shortDesc,
      longDesc: service.longDesc,
      coverImage: service.coverImage,
      icon: service.icon,
      isPublished: service.isPublished,
    });
    setEditingService(service);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreating) {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setServices([...services, data.service]);
          setIsCreating(false);
        }
      } else if (editingService) {
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setServices(
            services.map((s) => (s.id === editingService.id ? data.service : s))
          );
          setEditingService(null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete service "${name}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A880] text-[#121212] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-stone-300">
          <thead className="bg-[#1A1A1A] text-stone-400 uppercase text-[10px] font-mono-tech">
            <tr>
              <th className="p-3.5">Num</th>
              <th className="p-3.5">Cover</th>
              <th className="p-3.5">Service Name</th>
              <th className="p-3.5">Short Description</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="p-3.5 font-mono-tech text-base text-[#C5A880] font-semibold">
                  {s.number}
                </td>
                <td className="p-3.5">
                  <div
                    className="w-12 h-10 bg-cover bg-center border border-white/10"
                    style={{ backgroundImage: `url('${s.coverImage}')` }}
                  />
                </td>
                <td className="p-3.5 font-medium text-white">
                  <div>{s.name}</div>
                  <div className="text-[10px] font-mono-tech text-stone-500">
                    /services/{s.slug}
                  </div>
                </td>
                <td className="p-3.5 text-stone-400 max-w-xs truncate">
                  {s.shortDesc}
                </td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono-tech uppercase border ${
                      s.isPublished
                        ? "bg-emerald-950/40 text-emerald-300 border-emerald-800"
                        : "bg-stone-800 text-stone-400 border-stone-700"
                    }`}
                  >
                    {s.isPublished ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <Link
                    href={`/services/${s.slug}`}
                    target="_blank"
                    className="p-1.5 text-stone-400 hover:text-white transition-colors inline-block"
                    title="View live page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-1.5 text-[#C5A880] hover:text-white transition-colors inline-block"
                    title="Edit service"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id, s.name)}
                    className="p-1.5 text-stone-500 hover:text-red-400 transition-colors inline-block"
                    title="Delete service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add / Edit Service */}
      {(isCreating || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#141414] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif-heading text-xl text-white">
                {isCreating ? "Add Architectural Service" : `Edit ${formData.name}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingService(null);
                }}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Number
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Full Architectural Scope & Description
                </label>
                <textarea
                  rows={4}
                  value={formData.longDesc}
                  onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 accent-[#C5A880]"
                />
                <label htmlFor="published" className="text-white cursor-pointer">
                  Active & Visible in Panels
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 border border-white/20 text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#C5A880] text-[#121212] font-semibold uppercase tracking-wider"
                >
                  {loading ? "Saving..." : "Save Discipline"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
