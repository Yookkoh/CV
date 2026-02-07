import { prisma } from "@/lib/db";
import { updateAbout } from "@/app/admin/actions/about";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminAboutPage() {
  let dbError = false;
  let about: Awaited<ReturnType<typeof prisma.about.findFirst>> = null;

  try {
    about = await prisma.about.findFirst();
  } catch (err) {
    dbError = true;
    console.error("[db] Admin about query failed. Check DATABASE_URL.", err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">About</h1>
      {dbError && (
        <p className="text-sm text-muted-foreground mb-4">
          The database is not configured or unreachable. Set `DATABASE_URL` and run
          migrations to enable editing.
        </p>
      )}
      <GlassCard>
        <form action={updateAbout} className="space-y-4">
          <AdminFormField
            label="Content (Markdown)"
            name="content"
            defaultValue={about?.content || ""}
            textarea
            rows={16}
            required
          />
          <p className="text-xs text-muted-foreground">
            Supports Markdown formatting: **bold**, *italic*, ## headings, - lists, etc.
          </p>
          <SubmitButton>Save About</SubmitButton>
        </form>
      </GlassCard>
    </div>
  );
}
