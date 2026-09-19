"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";

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
}

interface ProjectShowcaseProps {
  projects: ProjectItem[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Luxury Interiors",
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
    <section className="py-24 sm:py-32 bg-[#FBF9F5] text-[#141414] relative overflow-hidden border-b border-[#141414]/10">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#141414]/10 pb-8 mb-12 gap-6">
          <div>
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#8C827A] block mb-2">
              [ 03 // PORTFOLIO ARCHIVE ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-[#141414]">
              Selected Work
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-light mt-2">
              Spaces we&apos;ve designed, built and transformed.
            </p>
          </div>

          {/* Category Filter Pills - Horizontally scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 border shrink-0 min-h-[38px] ${
                  selectedCategory === cat
                    ? "bg-[#141414] text-[#FBF9F5] border-[#141414]"
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#141414] hover:text-[#141414]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project, idx) => {
            // Editorial layout variation: alternate column spans for visual rhythm
            const colSpan =
              idx % 3 === 0
                ? "lg:col-span-8"
                : idx % 3 === 1
                ? "lg:col-span-4"
                : "lg:col-span-6";

            const heightClass =
              idx % 3 === 0
                ? "h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[540px]"
                : "h-[300px] sm:h-[380px] lg:h-[420px] xl:h-[460px]";

            return (
              <div key={project.slug} className={`${colSpan} group relative`}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative overflow-hidden bg-[#1A1A1A] border border-[#141414]/10 shadow-sm"
                >
                  {/* Project Image with hover zoom */}
                  <div
                    className={`w-full ${heightClass} bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105`}
                    style={{ backgroundImage: `url('${project.coverImage}')` }}
                  />

                  {/* Gradient Overlay for Editorial Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/40 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-95" />

                  {/* Top Technical Metadata Tag */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#FBF9F5]/90 pointer-events-none">
                    <span className="bg-[#141414]/75 backdrop-blur-sm px-2.5 py-1 border border-white/10 truncate max-w-[48%]">
                      {project.category}
                    </span>
                    <span className="bg-[#141414]/75 backdrop-blur-sm px-2.5 py-1 border border-white/10 truncate max-w-[48%]">
                      {project.year} • {project.area}
                    </span>
                  </div>

                  {/* Bottom Content (Always clearly visible on touch, graceful hover on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 transition-transform duration-500 transform translate-y-0 lg:translate-y-1 group-hover:translate-y-0">
                    <div className="flex items-center gap-1.5 text-stone-300 text-xs mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="font-serif-heading text-lg sm:text-2xl text-white font-semibold mb-2.5 leading-snug">
                      {project.title}
                    </h3>

                    {/* View project button & specs indicator */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/15 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-[#C5A880] truncate max-w-[60%]">
                        {project.materialsUsed.split(",")[0]}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-white group-hover:text-[#C5A880] transition-colors shrink-0">
                        <span>View Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Explore All Works Button */}
        <div className="pt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#141414] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#141414] transition-colors border border-[#141414]"
          >
            <span>View Complete Project Archive</span>
            <Maximize2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
