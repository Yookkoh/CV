import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillsList } from "./SkillsList";

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      skills: { orderBy: { order: "asc" } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Skills</h1>
      <GlassCard>
        <SkillsList categories={categories} />
      </GlassCard>
    </div>
  );
}
