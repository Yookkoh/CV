import { prisma } from "@/lib/db";
import { updateSettings } from "@/app/admin/actions/settings";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminSettingsPage() {
  let dbError = false;
  let settings: Awaited<ReturnType<typeof prisma.siteSettings.findFirst>> = null;

  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (err) {
    dbError = true;
    console.error("[db] Admin settings query failed. Check DATABASE_URL.", err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Site Settings</h1>
      {dbError && (
        <p className="text-sm text-muted-foreground mb-4">
          The database is not configured or unreachable. Set `DATABASE_URL` and run
          migrations to enable editing.
        </p>
      )}
      <GlassCard>
        <form action={updateSettings} className="space-y-4">
          <AdminFormField
            label="Site Title"
            name="siteTitle"
            defaultValue={settings?.siteTitle || ""}
            placeholder="My Portfolio"
            required
          />
          <AdminFormField
            label="Site Description"
            name="siteDescription"
            defaultValue={settings?.siteDescription || ""}
            textarea
            rows={3}
            required
          />
          <SubmitButton>Save Settings</SubmitButton>
        </form>
      </GlassCard>
    </div>
  );
}
