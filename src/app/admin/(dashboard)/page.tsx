import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import {
  User,
  FileText,
  Briefcase,
  Zap,
  FolderOpen,
  Settings,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [profileCount, experienceCount, skillCount, projectCount] =
    await Promise.all([
      prisma.profile.count(),
      prisma.experience.count(),
      prisma.skill.count(),
      prisma.project.count(),
    ]);

  const sections = [
    {
      label: "Profile",
      href: "/admin/profile",
      icon: User,
      count: profileCount,
      desc: "Name, headline, contact info",
    },
    {
      label: "About",
      href: "/admin/about",
      icon: FileText,
      count: null,
      desc: "Bio and background",
    },
    {
      label: "Experience",
      href: "/admin/experience",
      icon: Briefcase,
      count: experienceCount,
      desc: "Work history and roles",
    },
    {
      label: "Skills",
      href: "/admin/skills",
      icon: Zap,
      count: skillCount,
      desc: "Technical skills",
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: FolderOpen,
      count: projectCount,
      desc: "Portfolio projects",
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      count: null,
      desc: "Site title, SEO",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href}>
              <GlassCard className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{s.label}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                    {s.count !== null && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {s.count} {s.count === 1 ? "entry" : "entries"}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
