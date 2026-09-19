"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Star, X } from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  projectTitle: string;
  location: string;
  review: string;
  rating: number;
  isPublished: boolean;
}

export default function TestimonialsClient({
  initialTestimonials,
}: {
  initialTestimonials: TestimonialItem[];
}) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    projectTitle: "",
    location: "",
    review: "",
    rating: 5,
    isPublished: true,
  });

  const openCreateModal = () => {
    setFormData({
      clientName: "",
      projectTitle: "",
      location: "New Delhi",
      review: "",
      rating: 5,
      isPublished: true,
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const openEditModal = (t: TestimonialItem) => {
    setFormData({
      clientName: t.clientName,
      projectTitle: t.projectTitle,
      location: t.location,
      review: t.review,
      rating: t.rating,
      isPublished: t.isPublished,
    });
    setEditingItem(t);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreating) {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setTestimonials([...testimonials, data.testimonial]);
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/testimonials/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setTestimonials(
            testimonials.map((item) => (item.id === editingItem.id ? data.testimonial : item))
          );
          setEditingItem(null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
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
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#141414] border border-white/10 p-6 flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-[#C5A880]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>
                <span
                  className={`text-[9px] font-mono-tech uppercase px-2 py-0.5 border ${
                    t.isPublished
                      ? "text-emerald-300 border-emerald-800"
                      : "text-stone-500 border-stone-700"
                  }`}
                >
                  {t.isPublished ? "Visible" : "Hidden"}
                </span>
              </div>

              <p className="text-stone-300 text-xs italic leading-relaxed">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white text-xs">{t.clientName}</div>
                <div className="text-[10px] font-mono-tech text-stone-400">
                  {t.projectTitle} • {t.location}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(t)}
                  className="p-1 text-[#C5A880] hover:text-white"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-1 text-stone-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#141414] border border-white/15 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif-heading text-lg text-white">
                {isCreating ? "Record Client Testimonial" : "Edit Testimonial"}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    placeholder="Soma Penthouse Atrium"
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Worli, Mumbai"
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="The client's authentic review of the space and execution..."
                  className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Star Rating (1-5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="t_published"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-[#C5A880]"
                  />
                  <label htmlFor="t_published" className="text-white cursor-pointer">
                    Visible on Website
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
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
                  {loading ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
