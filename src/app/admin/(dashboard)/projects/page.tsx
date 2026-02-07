import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectList } from "./ProjectList";

export default async function AdminProjectsPage() {
  let dbError = false;
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    dbError = true;
    console.error("[db] Admin projects query failed. Check DATABASE_URL.", err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Projects</h1>
      {dbError && (
        <p className="text-sm text-muted-foreground mb-4">
          The database is not configured or unreachable. Set `DATABASE_URL` and run
          migrations to enable editing.
        </p>
      )}
      <GlassCard>
        <ProjectList projects={projects} />
      </GlassCard>
    </div>
  );
}
