import { prisma } from "@/lib/db";
import { formatDateRange } from "@/lib/utils";
import { PageTransition } from "@/components/layout/PageTransition";
import { ResumeActions } from "./ResumeActions";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Portfolio",
  description: "My professional resume.",
};

export default async function ResumePage() {
  const [profile, experiences, categories, projects] = await Promise.all(
    [
      prisma.profile.findFirst(),
      prisma.experience.findMany({
        where: { isPublished: true },
        orderBy: { order: "asc" },
      }),
      prisma.skillCategory.findMany({
        orderBy: { order: "asc" },
        include: { skills: { orderBy: { order: "asc" } } },
      }),
      prisma.project.findMany({
        where: { isPublished: true, featured: true },
        orderBy: { order: "asc" },
        take: 4,
      }),
    ]
  );

  if (!profile) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <p className="text-muted-foreground">No profile data yet.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="py-4 md:py-8">
        <ResumeActions />

        {/* A4 Paper */}
        <div
          id="resume"
          className="bg-white text-[#1d1d1f] mx-auto shadow-2xl print:shadow-none"
          style={{
            width: "210mm",
            maxWidth: "100%",
            minHeight: "297mm",
            padding: "12mm 16mm",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {/* Header */}
          <header className="mb-6 pb-4 border-b border-[#e5e5e5]">
            <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
              {profile.fullName}
            </h1>
            <p className="text-sm font-medium text-[#86868b] mt-0.5">
              {profile.headline}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-[#515154]">
              <span className="flex items-center gap-1">
                <Mail size={11} /> {profile.email}
              </span>
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={11} /> {profile.phone}
                </span>
              )}
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> {profile.location}
                </span>
              )}
              {profile.linkedinUrl && (
                <span className="flex items-center gap-1">
                  <Linkedin size={11} />{" "}
                  {profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
              {profile.githubUrl && (
                <span className="flex items-center gap-1">
                  <Github size={11} />{" "}
                  {profile.githubUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
              {profile.websiteUrl && (
                <span className="flex items-center gap-1">
                  <Globe size={11} />{" "}
                  {profile.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
            </div>
          </header>

          {/* Summary */}
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-2">
              Summary
            </h2>
            <p className="text-xs leading-relaxed text-[#515154]">
              {profile.summary}
            </p>
          </section>

          {/* Experience */}
          {experiences.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1d1d1f]">
                          {exp.roleTitle}
                        </h3>
                        <p className="text-xs text-[#515154]">
                          {exp.company}
                          {exp.location && ` \u2022 ${exp.location}`}
                          {exp.employmentType && ` \u2022 ${exp.employmentType}`}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#86868b] whitespace-nowrap ml-4">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                    {exp.highlights.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="text-[11px] leading-snug text-[#515154] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-1 before:h-1 before:rounded-full before:bg-[#c7c7cc]"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.techTags.length > 0 && (
                      <p className="text-[10px] text-[#86868b] mt-1.5">
                        {exp.techTags.join(" \u00B7 ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {categories.length > 0 && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-3">
                Skills
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <h3 className="text-[11px] font-semibold text-[#1d1d1f] mb-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-[#515154]">
                      {cat.skills.map((s) => s.name).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Selected Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-3">
                Selected Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-[11px] font-semibold text-[#1d1d1f]">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] text-[#515154] leading-snug">
                      {proj.shortDescription}
                    </p>
                    <p className="text-[10px] text-[#86868b] mt-0.5">
                      {proj.techTags.join(" \u00B7 ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
