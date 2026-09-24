import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import MobileStickyBar from "@/components/shared/MobileStickyBar";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    return { title: "Service Not Found | SK Construction" };
  }

  return {
    title: `${service.name} | SK Construction`,
    description: service.shortDesc,
    openGraph: {
      title: service.name,
      description: service.shortDesc,
      images: [service.coverImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  const [service, relatedProjects, rawSettings] = await Promise.all([
    prisma.service.findUnique({
      where: { slug },
    }),
    prisma.project.findMany({
      where: { isPublished: true },
      take: 2,
    }),
    prisma.siteSetting.findMany(),
  ]);

  if (!service || !service.isPublished) {
    notFound();
  }

  const settings: Record<string, string> = {};
  rawSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsapp || "+91 98765 43210";

  let features: string[] = [];
  try {
    features = JSON.parse(service.features || "[]");
  } catch {
    features = [];
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5] text-[#141414]">
      <Navbar phone={phone} whatsapp={whatsapp} />

      <main className="flex-1 pt-24">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-500 hover:text-[#141414] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-12">
          <div className="border-b border-[#141414]/10 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xl text-[#C5A880] font-semibold">
                {service.number}
              </span>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-stone-400">
                ARCHITECTURAL DISCIPLINE
              </span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-6xl tracking-tight text-[#141414]">
              {service.name}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
          <div
            className="w-full h-[280px] sm:h-[420px] md:h-[540px] bg-cover bg-center border border-[#141414]/15 shadow-lg relative"
            style={{ backgroundImage: `url('${service.coverImage}')` }}
          />
        </div>

        {/* Narrative & Capabilities Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block">
                  [ SCOPE & METHODOLOGY ]
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#141414]">
                  Execution Standards
                </h2>
                <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
                  {service.longDesc}
                </p>
              </div>

              {features.length > 0 && (
                <div className="pt-6 border-t border-[#141414]/10 space-y-4">
                  <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#C5A880] block">
                    [ KEY DISCIPLINE HIGHLIGHTS ]
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-start gap-3 p-4 bg-[#F4EFEA] border border-stone-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="text-xs text-stone-800 leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Consultation Card */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 border border-[#141414]/15 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="font-serif-heading text-xl text-[#141414]">
                  Commission This Service
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed font-light">
                  Direct engagement with our principal architect and project engineering directors.
                </p>
                <Link
                  href="/#enquire"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#141414] text-[#FBF9F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#141414] transition-colors"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Related Works */}
        {relatedProjects.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 border-t border-[#141414]/10">
            <div className="mb-8">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-[#8C827A] block mb-2">
                [ DEMONSTRATED APPLICATION ]
              </span>
              <h2 className="font-serif-heading text-3xl text-[#141414]">
                Featured Works Applying This Discipline
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.slug}
                  href={`/projects/${proj.slug}`}
                  className="group block border border-[#141414]/10 bg-[#1A1A1A] overflow-hidden"
                >
                  <div
                    className="w-full h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${proj.coverImage}')` }}
                  />
                  <div className="p-6 bg-[#FBF9F5] flex items-center justify-between">
                    <div>
                      <div className="font-serif-heading text-xl text-[#141414]">
                        {proj.title}
                      </div>
                      <div className="text-xs text-stone-500 font-mono-tech">
                        {proj.location} • {proj.year}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer settings={settings} />
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
