import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderKanban,
  Users,
  Quote,
  Layers,
  ArrowUpRight,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import LeadStatusUpdater from "./LeadStatusUpdater";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch counts and recent leads
  const [
    totalProjects,
    publishedProjects,
    totalLeads,
    newLeads,
    totalTestimonials,
    totalMaterials,
    recentLeads,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { isPublished: true } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.testimonial.count(),
    prisma.material.count(),
    prisma.lead.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { notes: true },
    }),
    prisma.project.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
            EXECUTIVE DASHBOARD
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
            Studio Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A880] text-[#121212] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
          >
            <span>Add New Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Counters Grid - Responsive across mobile, tablet, and desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-[#141414] border border-white/10 p-4 sm:p-5 space-y-1">
          <div className="text-[10px] font-mono-tech uppercase tracking-wider text-stone-400">
            Total Projects
          </div>
          <div className="text-2xl font-serif-heading font-bold text-white">
            {totalProjects}
          </div>
          <div className="text-[11px] text-[#C5A880]">{publishedProjects} Published</div>
        </div>

        <div className="bg-[#141414] border border-white/10 p-5 space-y-1">
          <div className="text-[10px] font-mono-tech uppercase tracking-wider text-stone-400">
            Total Enquiries
          </div>
          <div className="text-2xl font-serif-heading font-bold text-white">
            {totalLeads}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">CRM Pipeline</div>
        </div>

        <div className="bg-[#141414] border border-white/10 p-5 space-y-1">
          <div className="text-[10px] font-mono-tech uppercase tracking-wider text-stone-400">
            New Leads
          </div>
          <div className="text-2xl font-serif-heading font-bold text-[#C5A880]">
            {newLeads}
          </div>
          <div className="text-[11px] text-amber-400">Needs Contact</div>
        </div>

        <div className="bg-[#141414] border border-white/10 p-5 space-y-1">
          <div className="text-[10px] font-mono-tech uppercase tracking-wider text-stone-400">
            Testimonials
          </div>
          <div className="text-2xl font-serif-heading font-bold text-white">
            {totalTestimonials}
          </div>
          <div className="text-[11px] text-stone-400">Client Reviews</div>
        </div>

        <div className="bg-[#141414] border border-white/10 p-5 space-y-1">
          <div className="text-[10px] font-mono-tech uppercase tracking-wider text-stone-400">
            Materials
          </div>
          <div className="text-2xl font-serif-heading font-bold text-white">
            {totalMaterials}
          </div>
          <div className="text-[11px] text-stone-400">Tactile Swatches</div>
        </div>

        <div className="bg-[#141414] border border-white/10 p-5 space-y-1">
          <div className="text-[10px] font-mono-tech uppercase tracking-wider text-stone-400">
            Conversion Rate
          </div>
          <div className="text-2xl font-serif-heading font-bold text-emerald-400">
            {totalLeads > 0 ? `${Math.round((totalProjects / totalLeads) * 100)}%` : "N/A"}
          </div>
          <div className="text-[11px] text-stone-400">Lead to Built</div>
        </div>
      </div>

      {/* Main Grid: Recent Leads Table & Quick Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Leads / CRM Pipeline */}
        <div className="lg:col-span-8 bg-[#141414] border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-serif-heading text-lg text-white font-semibold">
                Recent Client Enquiries
              </h2>
              <span className="text-[10px] font-mono-tech text-stone-400 uppercase tracking-wider">
                Direct Lead Submissions from Website
              </span>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono-tech text-[#C5A880] hover:underline"
            >
              View Full CRM ({totalLeads}) →
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-stone-500 text-xs">
              No client enquiries received yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-[#1A1A1A] text-stone-400 uppercase text-[10px] font-mono-tech">
                  <tr>
                    <th className="p-3">Client</th>
                    <th className="p-3">Scope & City</th>
                    <th className="p-3">Budget</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-[11px] text-stone-400 font-mono-tech">
                          {lead.phone}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-white">{lead.projectType}</div>
                        <div className="text-[11px] text-stone-400">{lead.city}</div>
                      </td>
                      <td className="p-3 text-[#C5A880] font-mono-tech">
                        {lead.budgetRange}
                      </td>
                      <td className="p-3">
                        <LeadStatusUpdater leadId={lead.id} initialStatus={lead.status} />
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/admin/leads`}
                          className="text-[#C5A880] hover:text-white font-mono-tech text-[11px] underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Quick Projects Overview */}
        <div className="lg:col-span-4 bg-[#141414] border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-serif-heading text-lg text-white font-semibold">
                Recent Projects
              </h2>
              <span className="text-[10px] font-mono-tech text-stone-400 uppercase tracking-wider">
                Portfolio Showcase
              </span>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono-tech text-[#C5A880] hover:underline"
            >
              All →
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-2.5 bg-[#1A1A1A] border border-white/5 hover:border-white/20 transition-colors"
              >
                <div
                  className="w-12 h-12 bg-cover bg-center shrink-0 border border-white/10"
                  style={{ backgroundImage: `url('${p.coverImage}')` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-white truncate">
                    {p.title}
                  </div>
                  <div className="text-[10px] font-mono-tech text-stone-400 truncate">
                    {p.category} • {p.location}
                  </div>
                </div>
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="text-[10px] uppercase font-mono-tech text-[#C5A880] hover:text-white px-2 py-1 bg-white/5"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              href="/admin/projects/new"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880]/10 text-xs font-mono-tech uppercase tracking-wider transition-colors"
            >
              <span>+ Create Architectural Case Study</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
