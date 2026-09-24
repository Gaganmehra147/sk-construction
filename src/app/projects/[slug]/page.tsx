import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileStickyBar from "@/components/shared/MobileStickyBar";
import {
  MapPin,
  Calendar,
  Maximize,
  Tag,
  ArrowUpRight,
  ArrowLeft,
  CheckCircle,
  Layers,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return { title: "Project Not Found | SK Construction" };
  }

  return {
    title: `${project.title} | SK Construction`,
    description: project.overview,
    openGraph: {
      title: project.title,
      description: project.overview,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const [project, rawSettings] = await Promise.all([
    prisma.project.findUnique({
      where: { slug },
    }),
    prisma.siteSetting.findMany(),
  ]);

  if (!project || !project.isPublished) {
    notFound();
  }

  const settings: Record<string, string> = {};
  rawSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsapp || "+91 98765 43210";

  let gallery: string[] = [];
  try {
    gallery = JSON.parse(project.galleryImages || "[]");
  } catch {
    gallery = [];
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5] text-[#141414]">
      <Navbar phone={phone} whatsapp={whatsapp} />

      <main className="flex-1 pt-24">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-500 hover:text-[#141414] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Hero Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-12">
          <div className="border-b border-[#141414]/10 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] text-[#C5A880] text-[10px] font-mono-tech uppercase tracking-widest">
              <span>{project.category}</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#141414] leading-[1.06]">
              {project.title}
            </h1>

            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4 text-xs font-mono-tech uppercase tracking-wider text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Completed {project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-[#C5A880]" />
                <span>{project.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#C5A880]" />
                <span>{project.clientType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Hero Image */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <div
            className="w-full h-[320px] sm:h-[480px] md:h-[640px] bg-cover bg-center border border-[#141414]/15 shadow-xl relative"
            style={{ backgroundImage: `url('${project.coverImage}')` }}
          >
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 px-3 sm:px-3.5 py-1.5 bg-[#141414]/85 backdrop-blur-md text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest text-[#FBF9F5] border border-white/10">
              ARCHITECTURAL RECORD • {project.location.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Editorial Narrative Split Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Main Editorial Narrative */}
            <div className="lg:col-span-8 space-y-12">
              {/* Project Overview */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block">
                  [ 01 // OVERVIEW ]
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#141414]">
                  Spatial Intent & Program
                </h2>
                <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-light">
                  {project.overview}
                </p>
              </div>

              {/* Design Concept */}
              <div className="space-y-4 border-t border-[#141414]/10 pt-8">
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block">
                  [ 02 // DESIGN CONCEPT ]
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#141414]">
                  Architectural Philosophy
                </h2>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                  {project.concept}
                </p>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#141414]/10 pt-8">
                <div className="space-y-3 bg-[#F3EFEA] p-6 border border-[#141414]/5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#8B6F57] block">
                    THE ARCHITECTURAL CHALLENGE
                  </span>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="space-y-3 bg-[#F3EFEA] p-6 border border-[#141414]/5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#C5A880] block">
                    OUR ENGINEERING SOLUTION
                  </span>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Execution & Final Results */}
              <div className="space-y-6 border-t border-[#141414]/10 pt-8">
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block">
                  [ 03 // EXECUTION & DELIVERY ]
                </span>
                <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                  <p>{project.execution}</p>
                  <p className="font-medium text-[#141414] bg-[#F4EFEA] p-4 border-l-2 border-[#C5A880]">
                    Result: {project.results}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sticky Project Specifications Column */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 border border-[#141414]/15 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="border-b border-[#141414]/10 pb-4">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#8C827A]">
                    DOSSIER SPECIFICATIONS
                  </span>
                  <h3 className="font-serif-heading text-xl text-[#141414] mt-1">
                    Technical Summary
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-stone-500 font-mono-tech text-[10px] uppercase block">
                      Category
                    </span>
                    <span className="font-medium text-[#141414] text-sm">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 font-mono-tech text-[10px] uppercase block">
                      Location
                    </span>
                    <span className="font-medium text-[#141414] text-sm">
                      {project.location}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 font-mono-tech text-[10px] uppercase block">
                      Footprint Area
                    </span>
                    <span className="font-medium text-[#141414] text-sm">
                      {project.area}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-500 font-mono-tech text-[10px] uppercase block">
                      Execution Scope
                    </span>
                    <span className="font-medium text-[#141414] text-sm">
                      Turnkey Architecture & Interior Fit-Out
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-stone-500 font-mono-tech text-[10px] uppercase block mb-1">
                      Material Palette
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.materialsUsed.split(",").map((mat) => (
                        <span
                          key={mat}
                          className="px-2 py-1 bg-[#F4EFEA] text-[#141414] text-[11px] border border-stone-200"
                        >
                          {mat.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#141414]/10">
                  <Link
                    href="/#enquire"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#141414] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#141414] transition-colors"
                  >
                    <span>Commission Similar Space</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Resolution Project Gallery */}
        {gallery.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-[#141414]/10">
            <div className="mb-8">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block mb-2">
                [ 04 // VISUAL ARCHIVE ]
              </span>
              <h2 className="font-serif-heading text-3xl text-[#141414]">
                Spatial Photography
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-80 sm:h-96 bg-cover bg-center border border-[#141414]/10 shadow-sm"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-[#141414] text-white py-16 sm:py-24 border-t border-white/10 mt-16">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
            <span className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#C5A880]">
              [ INITIATE YOUR PROJECT ]
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Want a similar space? Talk to our team.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              Whether you are acquiring a new property, breaking ground on a standalone plot, or revamping an existing penthouse, let us guide the architectural execution.
            </p>
            <div className="pt-4">
              <Link
                href="/#enquire"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                <span>Schedule Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
