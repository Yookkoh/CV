import { requireAdmin } from "@/lib/auth-helpers";
import { Sidebar } from "@/components/admin/Sidebar";
import { SessionProvider } from "@/components/admin/SessionProvider";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 max-w-4xl">{children}</main>
      </div>
    </SessionProvider>
  );
}
