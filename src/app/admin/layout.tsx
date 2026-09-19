import { getAdminSession } from "@/lib/auth";
import AdminShellClient from "./AdminShellClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If not logged in, render child directly (allows /admin/login to render cleanly)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminShellClient
      session={{
        name: session.name || "Administrator",
        role: session.role || "SUPER_ADMIN",
        email: session.email || "admin@vijayinterior.com",
      }}
    >
      {children}
    </AdminShellClient>
  );
}

