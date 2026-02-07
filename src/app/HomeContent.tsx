"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
} from "lucide-react";

interface ProfileData {
  fullName: string;
  headline: string;
  summary: string;
  email: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  profilePhotoUrl: string | null;
}

interface ExperienceData {
  id: string;
  roleTitle: string;
  company: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  techTags: string[];
}

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  techTags: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

function formatDateRange(start: string, end: string | null) {
  const s = new Date(start);
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} — Present`;
  const e = new Date(end);
  return `${startStr} — ${e.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

export function HomeContent({
  profile,
  experiences,
  projects,
}: {
  profile: ProfileData;
  experiences: ExperienceData[];
  projects: ProjectData[];
}) {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-4 flex-1">
            <motion.p
              className="text-sm font-medium text-muted-foreground tracking-wide uppercase"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {profile.headline}
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              {profile.fullName}
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              {profile.summary}
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-3 pt-2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
            >
              <Link href="/contact">
                <Button>
                  Get in Touch
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/resume">
                <Button variant="secondary">
                  <Download size={16} className="mr-2" />
                  Resume
                </Button>
              </Link>
              <div className="flex items-center gap-1 ml-1">
                {profile.githubUrl && (
                  <motion.a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                  </motion.a>
                )}
                {profile.linkedinUrl && (
                  <motion.a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                )}
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={18} />
                </motion.a>
              </div>
            </motion.div>
          </div>
          {/* Profile Photo */}
          {profile.profilePhotoUrl && (
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden glass ring-1 ring-border animate-float">
                <Image
                  src={profile.profilePhotoUrl}
                  alt={profile.fullName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Experience */}
      {experiences.length > 0 && (
        <section className="py-8 md:py-12">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Experience
              </h2>
              <Link
                href="/experience"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <StaggerChildren className="space-y-3">
            {experiences.map((exp) => (
              <StaggerItem key={exp.id}>
                <GlassCard className="p-5" hover>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1.5">
                    <div>
                      <h3 className="font-semibold text-[0.9375rem]">
                        {exp.roleTitle}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {exp.company}
                        {exp.location && ` \u00B7 ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                  {exp.techTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.techTags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-8 md:py-12">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Projects
              </h2>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <Link href={`/projects/${project.slug}`}>
                  <GlassCard className="h-full p-5 cursor-pointer" hover>
                    <h3 className="font-semibold text-[0.9375rem] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techTags.slice(0, 4).map((tag) => (
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
        </section>
      )}
    </div>
  );
}
