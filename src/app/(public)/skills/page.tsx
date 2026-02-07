import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { SkillsContent } from "./SkillsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Portfolio",
  description: "My technical skills and areas of expertise.",
};

export default async function SkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      skills: {
        orderBy: { order: "asc" },
      },
    },
  });

  return (
    <PageTransition>
      <SkillsContent
        categories={categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          skills: cat.skills.map((s) => ({
            id: s.id,
            name: s.name,
            level: s.level,
          })),
        }))}
      />
    </PageTransition>
  );
}
