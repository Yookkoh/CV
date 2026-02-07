import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectList } from "./ProjectList";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Projects</h1>
      <GlassCard>
        <ProjectList projects={projects} />
      </GlassCard>
    </div>
  );
}
