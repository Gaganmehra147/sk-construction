import { prisma } from "@/lib/prisma";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import HeroSection from "@/components/home/HeroSection";
import BrandStatement from "@/components/home/BrandStatement";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import ThreeDViewer from "@/components/home/ThreeDViewer";
import WhyVijaySection from "@/components/home/WhyVijaySection";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import ProcessSection from "@/components/home/ProcessSection";
import CraftsmanshipMaterials from "@/components/home/CraftsmanshipMaterials";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LeadEnquirySection from "@/components/home/LeadEnquirySection";
import MobileStickyBar from "@/components/shared/MobileStickyBar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Query all database records concurrently for performance
  const [
    services,
    projects,
    materials,
    stats,
    testimonials,
    rawSettings,
  ] = await Promise.all([
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.material.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.statItem.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.siteSetting.findMany(),
  ]);

  // Convert settings array into key-value map
  const settings: Record<string, string> = {};
  rawSettings.forEach((s) => {
    settings[s.key] = s.value;
  });

  const phone = settings.phone || "+91 98765 43210";
  const whatsapp = settings.whatsapp || "+91 98765 43210";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF9F5]">
      {/* JSON-LD Structured Data for LocalBusiness & HomeAndConstructionBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "name": settings.business_name || "Vijay Interior & Construction",
            "description":
              settings.tagline ||
              "Premium Interior Design, Architecture & Turnkey Construction Company",
            "telephone": phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": settings.address || "Plot 42, Architectural Enclave",
              "addressLocality": "New Delhi",
              "addressCountry": "IN",
            },
            "priceRange": "₹₹₹₹",
            "openingHours": "Mo-Sa 09:30-19:00",
          }),
        }}
      />

      {/* Sticky Navigation */}
      <Navbar phone={phone} whatsapp={whatsapp} />

      {/* Main Content Sections in Prompt-Specified Sequence */}
      <main className="flex-1">
        {/* 1. Premium Cinematic Hero */}
        <HeroSection />

        {/* 2. Brand Editorial Statement */}
        <BrandStatement />

        {/* 3. Interactive Horizontal Services */}
        <ServicesSection services={services} />

        {/* 4. Selected Projects Masonry Showcase */}
        <ProjectShowcase projects={projects} />

        {/* 5. 3D Architectural Spatial Experience */}
        <ThreeDViewer />

        {/* 6. Why Vijay Trust Metrics */}
        <WhyVijaySection stats={stats} />

        {/* 7. Before / After Transformation Slider */}
        <BeforeAfterSlider />

        {/* 8. 9-Stage Architectural Process */}
        <ProcessSection />

        {/* 9. Craftsmanship & Materials Showcase */}
        <CraftsmanshipMaterials materials={materials} />

        {/* 10. Client Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 11. Lead Generation / Consultation */}
        <LeadEnquirySection phone={phone} whatsapp={whatsapp} />
      </main>

      {/* 12. Architectural Footer */}
      <Footer settings={settings} />

      {/* Dedicated Mobile Sticky Action Bar */}
      <MobileStickyBar phone={phone} whatsapp={whatsapp} />
    </div>
  );
}
