import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { ExperienceList } from "./ExperienceList";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Experience</h1>
      <GlassCard>
        <ExperienceList experiences={experiences} />
      </GlassCard>
    </div>
  );
}
