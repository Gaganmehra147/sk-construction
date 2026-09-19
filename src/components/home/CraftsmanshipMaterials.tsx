"use client";

import { useState } from "react";
import { Layers, Sparkles } from "lucide-react";

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  finish: string;
  application: string;
  description: string;
  image: string;
}

interface CraftsmanshipMaterialsProps {
  materials: MaterialItem[];
}

export default function CraftsmanshipMaterials({ materials }: CraftsmanshipMaterialsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Marble",
    "Wood",
    "Stone",
    "Glass",
    "Metal",
    "Fabric",
    "Lighting",
  ];

  const filteredMaterials =
    activeCategory === "All"
      ? materials
      : materials.filter(
          (m) => m.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section className="py-24 sm:py-32 bg-[#FBF9F5] text-[#141414] relative overflow-hidden border-b border-[#141414]/10">
      {/* Blueprint grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#141414]/10 pb-8 mb-12 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#8C827A] block mb-2">
              [ 07 // MATERIALITY & CRAFT ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-[#141414]">
              Materials of Distinction
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-light mt-2 max-w-lg">
              We reject synthetic facsimiles. Every residence is composed with authentic natural stone, vacuum-fumed timber, and architectural metals.
            </p>
          </div>

          {/* Category Tabs - Scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all border shrink-0 min-h-[36px] ${
                  activeCategory === cat
                    ? "bg-[#141414] text-[#FBF9F5] border-[#141414] font-medium"
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#141414]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll / Grid of Macro Material Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map((m) => (
            <div
              key={m.id}
              className="group border border-[#141414]/10 bg-white overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#C5A880] transition-colors"
            >
              {/* Macro Image */}
              <div className="relative w-full h-56 overflow-hidden bg-[#1A1A1A]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${m.image}')` }}
                />
                <div className="absolute top-3 left-3 bg-[#141414]/80 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono-tech uppercase tracking-widest text-[#C5A880] border border-white/10">
                  {m.category}
                </div>
              </div>

              {/* Material Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif-heading text-lg text-[#141414] font-semibold leading-snug">
                    {m.name}
                  </h3>
                  <div className="text-[11px] font-mono-tech text-[#8B6F57]">
                    Finish: {m.finish}
                  </div>
                </div>

                <p className="text-stone-600 text-xs font-light leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                  <strong className="text-[#141414] font-medium">Application:</strong>{" "}
                  {m.application}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
