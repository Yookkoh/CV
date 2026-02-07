"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { ExternalLink, Github } from "lucide-react";

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  techTags: string[];
  repoUrl: string | null;
  liveUrl: string | null;
}

export function ProjectsContent({ projects }: { projects: ProjectData[] }) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Projects
        </h1>
      </ScrollReveal>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href={`/projects/${project.slug}`}>
                <GlassCard className="h-full cursor-pointer group" hover>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 ml-2">
                      {project.repoUrl && (
                        <Github size={14} className="text-muted-foreground" />
                      )}
                      {project.liveUrl && (
                        <ExternalLink
                          size={14}
                          className="text-muted-foreground"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techTags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </section>
  );
}
