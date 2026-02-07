"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";

interface SkillData {
  id: string;
  name: string;
  level: number | null;
}

interface CategoryData {
  id: string;
  name: string;
  skills: SkillData[];
}

function AnimatedSkillLevel({ level, delay }: { level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px 0px" });

  return (
    <div ref={ref} className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? "bg-foreground" : "bg-border"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.3,
            delay: delay + i * 0.06,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        />
      ))}
    </div>
  );
}

export function SkillsContent({ categories }: { categories: CategoryData[] }) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Skills
        </h1>
      </ScrollReveal>
      {categories.length === 0 ? (
        <p className="text-muted-foreground">No skills added yet.</p>
      ) : (
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.12}>
          {categories.map((cat, catIndex) => (
            <StaggerItem key={cat.id}>
              <GlassCard hover>
                <h2 className="text-lg font-semibold mb-4">{cat.name}</h2>
                <div className="space-y-3">
                  {cat.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{skill.name}</span>
                      {skill.level !== null && (
                        <AnimatedSkillLevel
                          level={skill.level}
                          delay={catIndex * 0.15 + skillIndex * 0.04}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </section>
  );
}
