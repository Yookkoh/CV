"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AboutContent({ content }: { content: string }) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          About
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <GlassCard>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        </GlassCard>
      </ScrollReveal>
    </section>
  );
}
