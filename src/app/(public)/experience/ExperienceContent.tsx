"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ExperienceData {
  id: string;
  roleTitle: string;
  company: string;
  location: string | null;
  employmentType: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  highlights: string[];
  techTags: string[];
}

function formatDateRange(start: string, end: string | null) {
  const s = new Date(start);
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} — Present`;
  const e = new Date(end);
  return `${startStr} — ${e.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

export function ExperienceContent({ experiences }: { experiences: ExperienceData[] }) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Experience
        </h1>
      </ScrollReveal>
      {experiences.length === 0 ? (
        <p className="text-muted-foreground">No experience entries yet.</p>
      ) : (
        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px bg-border ml-3 hidden md:block origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <ScrollReveal key={exp.id} delay={index * 0.1}>
                <div className="md:pl-10 relative">
                  {/* Animated timeline dot */}
                  <motion.div
                    className="absolute left-0 top-8 w-2 h-2 rounded-full bg-foreground ml-[9px] hidden md:block"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.15,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                  <GlassCard hover>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {exp.roleTitle}
                        </h3>
                        <p className="text-muted-foreground">
                          {exp.company}
                          {exp.location && ` \u00B7 ${exp.location}`}
                          {exp.employmentType && ` \u00B7 ${exp.employmentType}`}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {exp.description}
                      </p>
                    )}
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-muted-foreground">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techTags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
