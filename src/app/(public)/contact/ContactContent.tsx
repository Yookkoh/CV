"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/ui/StaggerChildren";
import { Mail, MapPin, Phone, Github, Linkedin, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
};

export function ContactContent({ items }: { items: ContactItem[] }) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Contact
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Feel free to reach out if you&apos;d like to work together or just want
          to say hello.
        </p>
      </ScrollReveal>
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
        {items.map((item) => {
          const Icon = iconMap[item.icon] || Mail;
          const content = (
            <GlassCard className="flex items-center gap-4" hover>
              <div className="p-3 rounded-xl bg-muted">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="font-medium text-sm">{item.value}</p>
              </div>
            </GlassCard>
          );
          if (item.href) {
            return (
              <StaggerItem key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {content}
                </a>
              </StaggerItem>
            );
          }
          return <StaggerItem key={item.label}>{content}</StaggerItem>;
        })}
      </StaggerChildren>
    </section>
  );
}
