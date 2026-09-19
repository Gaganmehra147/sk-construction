"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";

interface MaterialItem {
  id: string;
  name: string;
  category: string;
  finish: string;
  application: string;
  description: string;
  image: string;
}

export default function MaterialsClient({
  initialMaterials,
}: {
  initialMaterials: MaterialItem[];
}) {
  const [materials, setMaterials] = useState<MaterialItem[]>(initialMaterials);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<MaterialItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Marble",
    finish: "Honed",
    application: "Flooring & Islands",
    description: "",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  });

  const categories = ["Marble", "Wood", "Stone", "Tiles", "Glass", "Metal", "Fabric", "Lighting"];

  const openCreateModal = () => {
    setFormData({
      name: "",
      category: "Marble",
      finish: "Honed Natural",
      application: "Vanities & Fireplaces",
      description: "",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    });
    setIsCreating(true);
    setEditingItem(null);
  };

  const openEditModal = (m: MaterialItem) => {
    setFormData({
      name: m.name,
      category: m.category,
      finish: m.finish,
      application: m.application,
      description: m.description,
      image: m.image,
    });
    setEditingItem(m);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isCreating) {
        const res = await fetch("/api/materials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setMaterials([...materials, data.material]);
          setIsCreating(false);
        }
      } else if (editingItem) {
        const res = await fetch(`/api/materials/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setMaterials(
            materials.map((m) => (m.id === editingItem.id ? data.material : m))
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
    if (!confirm("Delete this material swatch?")) return;
    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMaterials(materials.filter((m) => m.id !== id));
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
          <span>Add Material Swatch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((m) => (
          <div
            key={m.id}
            className="bg-[#141414] border border-white/10 overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div
              className="w-full h-40 bg-cover bg-center border-b border-white/10 relative"
              style={{ backgroundImage: `url('${m.image}')` }}
            >
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono-tech uppercase text-[#C5A880]">
                {m.category}
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1">
              <div className="font-semibold text-white text-sm">{m.name}</div>
              <div className="text-[11px] font-mono-tech text-[#C5A880]">
                Finish: {m.finish}
              </div>
              <p className="text-stone-400 text-xs line-clamp-2">{m.description}</p>
              <div className="text-[10px] text-stone-500 pt-1">
                App: {m.application}
              </div>
            </div>

            <div className="p-3 border-t border-white/10 flex justify-end gap-2 bg-[#181818]">
              <button
                onClick={() => openEditModal(m)}
                className="p-1 text-[#C5A880] hover:text-white"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="p-1 text-stone-500 hover:text-red-400"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
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
                {isCreating ? "Add Material Swatch" : `Edit ${formData.name}`}
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
                  Material Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Calacatta Viola Marble"
                  className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                    Finish
                  </label>
                  <input
                    type="text"
                    value={formData.finish}
                    onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                    placeholder="e.g. Honed Silk"
                    className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Macro Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Typical Application
                </label>
                <input
                  type="text"
                  value={formData.application}
                  onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                  placeholder="e.g. Island Counters, Wall Paneling"
                  className="w-full bg-[#1A1A1A] border border-white/15 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase text-stone-300 block mb-1">
                  Material Description & Sourcing
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Quarry origin, grain characteristics, and aesthetic properties..."
                  className="w-full bg-[#1A1A1A] border border-white/15 p-3 text-white"
                />
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
                  {loading ? "Saving..." : "Save Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
