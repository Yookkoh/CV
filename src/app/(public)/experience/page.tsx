import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { ExperienceContent } from "./ExperienceContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Portfolio",
  description: "My professional experience and career history.",
};

export default async function ExperiencePage() {
  let experiences: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];

  try {
    experiences = await prisma.experience.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("[db] Experience page query failed. Check DATABASE_URL.", err);
  }

  return (
    <PageTransition>
      <ExperienceContent
        experiences={experiences.map((exp) => ({
          id: exp.id,
          roleTitle: exp.roleTitle,
          company: exp.company,
          location: exp.location,
          employmentType: exp.employmentType,
          startDate: exp.startDate.toISOString(),
          endDate: exp.endDate?.toISOString() || null,
          description: exp.description,
          highlights: exp.highlights,
          techTags: exp.techTags,
        }))}
      />
    </PageTransition>
  );
}
