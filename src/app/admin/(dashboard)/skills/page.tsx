import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillsList } from "./SkillsList";
import type { Prisma } from "@prisma/client";

type CategoryWithSkills = Prisma.SkillCategoryGetPayload<{
  include: { skills: true };
}>;

export default async function AdminSkillsPage() {
  let dbError = false;
  let categories: CategoryWithSkills[] = [];

  try {
    categories = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: { orderBy: { order: "asc" } },
      },
    });
  } catch (err) {
    dbError = true;
    console.error("[db] Admin skills query failed. Check DATABASE_URL.", err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Skills</h1>
      {dbError && (
        <p className="text-sm text-muted-foreground mb-4">
          The database is not configured or unreachable. Set `DATABASE_URL` and run
          migrations to enable editing.
        </p>
      )}
      <GlassCard>
        <SkillsList categories={categories} />
      </GlassCard>
    </div>
  );
}
