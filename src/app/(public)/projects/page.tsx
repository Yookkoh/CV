import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProjectsContent } from "./ProjectsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "A showcase of my projects and work.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

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
