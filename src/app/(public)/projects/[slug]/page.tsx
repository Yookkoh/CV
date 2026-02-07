import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) notFound();

  return (
    <PageTransition>
      <section className="py-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techTags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-8">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                <ExternalLink size={14} className="mr-1.5" />
                Live Demo
              </Button>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm">
                <Github size={14} className="mr-1.5" />
                Source Code
              </Button>
            </a>
          )}
        </div>
        <GlassCard>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{project.content}</Markdown>
          </div>
        </GlassCard>
      </section>
    </PageTransition>
  );
}
