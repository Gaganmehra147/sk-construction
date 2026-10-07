"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Layers, ArrowRight } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  area: string;
  coverImage: string;
  materialsUsed: string;
  overview?: string;
  isFeatured?: boolean;
}

interface ProjectShowcaseProps {
  projects: ProjectItem[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Residential",
    "Luxury Interiors",
    "Commercial",
    "Renovation",
    "Construction",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className="py-20 sm:py-28 bg-[#FBF9F5] text-[#141414] relative overflow-hidden border-b border-[#141414]/10">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header & Architectural Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#141414]/10 pb-8 mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#141414]/15 bg-white text-[#8C827A] text-[10px] font-mono-tech uppercase tracking-[0.25em] mb-3">
              <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>PORTFOLIO ARCHIVE • SELECTED COMMISSIONS</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-[#141414]">
              Selected Works
            </h2>
            <p className="text-stone-600 text-sm font-light mt-2 max-w-xl leading-relaxed">
              A curated anthology of private residences, commercial headquarters, and transformative renovations executed with architectural rigor.
            </p>
          </div>

          {/* Minimalist Tab Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-wider transition-all duration-300 border shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#141414] text-[#FBF9F5] border-[#141414] shadow-md"
                      : "bg-white text-stone-600 border-stone-200 hover:border-[#141414] hover:text-[#141414]"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Balanced Gallery Grid (2 Columns on Tablet/Desktop, High-End Card Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const firstMaterial = project.materialsUsed.split(",")[0]?.trim();
            const isFirstMasterpiece = idx === 0 && selectedCategory === "All";

            return (
              <div
                key={project.slug}
                className={`${isFirstMasterpiece ? "md:col-span-2" : "col-span-1"} group flex flex-col bg-white border border-[#141414]/10 transition-all duration-500 hover:border-[#C5A880] hover:shadow-xl`}
              >
                <Link href={`/projects/${project.slug}`} className="block overflow-hidden relative">
                  {/* Photo Frame with Aspect Ratio */}
                  <div
                    className={`w-full ${
                      isFirstMasterpiece
                        ? "h-[360px] sm:h-[480px] lg:h-[540px]"
                        : "h-[280px] sm:h-[360px] lg:h-[400px]"
                    } overflow-hidden bg-stone-900 relative`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url('${project.coverImage}')` }}
                    />

                    {/* Subtle Corner Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#141414]/85 backdrop-blur-md text-[10px] font-mono-tech uppercase tracking-widest text-white border border-white/10">
                        {project.category}
                      </span>
                      {isFirstMasterpiece && (
                        <span className="px-3 py-1 bg-[#C5A880] text-[10px] font-mono-tech uppercase tracking-widest text-[#121212] font-semibold">
                          FEATURED RESIDENCE
                        </span>
                      )}
                    </div>

                    {/* Top Right Area Badge */}
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#141414]/85 backdrop-blur-md text-[10px] font-mono-tech text-[#C5A880] border border-white/10">
                      {project.area}
                    </div>

                    {/* Subtle Hover Overlay with Arrow */}
                    <div className="absolute inset-0 bg-[#121212]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#141414]/90 text-white flex items-center justify-center shadow-2xl border border-[#C5A880]/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ArrowUpRight className="w-5 h-5 text-[#C5A880]" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Editorial Typography & Metadata Section (Cleanly below image) */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    {/* Location & Year */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                        <span className="font-mono-tech uppercase tracking-wider text-[11px] text-stone-600">
                          {project.location}
                        </span>
                      </div>
                      <span className="font-mono-tech text-[11px] text-stone-400">
                        COMPLETED {project.year}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#141414] group-hover:text-[#8B6F57] transition-colors leading-snug">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {/* Optional overview preview if available */}
                    {project.overview && (
                      <p className="text-stone-600 text-xs sm:text-sm font-light mt-2 line-clamp-2 leading-relaxed">
                        {project.overview}
                      </p>
                    )}
                  </div>

                  {/* Bottom Strip: Primary Material & Action */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate max-w-[65%]">
                      <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#8C827A]">
                        PRIMARY FINISH:
                      </span>
                      <span className="text-xs font-mono-tech uppercase text-[#141414] font-medium truncate">
                        {firstMaterial || "Natural Stone"}
                      </span>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-wider font-semibold text-[#141414] group-hover:text-[#8B6F57] transition-colors shrink-0"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA: View Archive */}
        <div className="pt-16 sm:pt-20 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#141414] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#141414] transition-all duration-300 border border-[#141414] shadow-lg"
          >
            <span>Explore Complete Architectural Archive</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
