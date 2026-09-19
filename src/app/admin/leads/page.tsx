import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeadsClientCRM from "./LeadsClientCRM";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const leads = await prisma.lead.findMany({
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.24em] text-[#C5A880]">
          CLIENT PIPELINE
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-1">
          Leads & Consultations CRM
        </h1>
        <p className="text-stone-400 text-xs mt-1">
          Manage inbound client inquiries, assign directors, update project stages, and record consultation notes.
        </p>
      </div>

      <LeadsClientCRM initialLeads={leads as any} />
    </div>
  );
}
