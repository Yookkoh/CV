import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProjectsContent } from "./ProjectsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "A showcase of my projects and work.",
};

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("[db] Projects page query failed. Check DATABASE_URL.", err);
  }

  return (
    <PageTransition>
      <ProjectsContent
        projects={projects.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          shortDescription: p.shortDescription,
          techTags: p.techTags,
          repoUrl: p.repoUrl,
          liveUrl: p.liveUrl,
        }))}
      />
    </PageTransition>
  );
}
