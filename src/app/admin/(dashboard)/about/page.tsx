import { prisma } from "@/lib/db";
import { updateAbout } from "@/app/admin/actions/about";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">About</h1>
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
