import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { ExperienceList } from "./ExperienceList";

export default async function AdminExperiencePage() {
  let dbError = false;
  let experiences: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];

  try {
    experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    dbError = true;
    console.error("[db] Admin experience query failed. Check DATABASE_URL.", err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Experience</h1>
      {dbError && (
        <p className="text-sm text-muted-foreground mb-4">
          The database is not configured or unreachable. Set `DATABASE_URL` and run
          migrations to enable editing.
        </p>
      )}
      <GlassCard>
        <ExperienceList experiences={experiences} />
      </GlassCard>
    </div>
  );
}
