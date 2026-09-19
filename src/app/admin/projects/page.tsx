import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ExternalLink, Trash2 } from "lucide-react";
import ProjectRowActions from "./ProjectRowActions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
            PORTFOLIO MANAGEMENT
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
            Architectural Projects ({projects.length})
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A880] text-[#121212] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      <div className="bg-[#141414] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-[#1A1A1A] text-stone-400 uppercase text-[10px] font-mono-tech">
              <tr>
                <th className="p-3.5">Cover</th>
                <th className="p-3.5">Project Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Area & Year</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No projects found. Click &quot;New Project&quot; to create one.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div
                        className="w-14 h-10 bg-cover bg-center border border-white/10"
                        style={{ backgroundImage: `url('${p.coverImage}')` }}
                      />
                    </td>
                    <td className="p-3.5 font-medium text-white">
                      <div>{p.title}</div>
                      <div className="text-[10px] font-mono-tech text-stone-500">
                        /{p.slug}
                      </div>
                    </td>
                    <td className="p-3.5 text-stone-300">{p.category}</td>
                    <td className="p-3.5 text-stone-300">{p.location}</td>
                    <td className="p-3.5 font-mono-tech text-stone-400">
                      {p.area} • {p.year}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono-tech uppercase border ${
                          p.isPublished
                            ? "bg-emerald-950/40 text-emerald-300 border-emerald-800"
                            : "bg-stone-800 text-stone-400 border-stone-700"
                        }`}
                      >
                        {p.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-stone-400 hover:text-white transition-colors inline-block"
                        title="View on site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="p-1.5 text-[#C5A880] hover:text-white transition-colors inline-block"
                        title="Edit project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <ProjectRowActions projectId={p.id} projectTitle={p.title} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
