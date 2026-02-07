import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { HomeContent } from "./HomeContent";
import type { Prisma } from "@prisma/client";

type ProfileWithPhoto = Prisma.ProfileGetPayload<{
  include: { profilePhoto: true };
}>;

export default async function HomePage() {
  let dbError = false;

  let profile: ProfileWithPhoto | null = null;
  let experiences: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    [profile, experiences, projects] = await Promise.all([
      prisma.profile.findFirst({
        include: { profilePhoto: true },
      }),
      prisma.experience.findMany({
        where: { isPublished: true },
        orderBy: { order: "asc" },
        take: 3,
      }),
      prisma.project.findMany({
        where: { isPublished: true, featured: true },
        orderBy: { order: "asc" },
        take: 6,
      }),
    ]);
  } catch (err) {
    dbError = true;
    console.error("[db] Home page query failed. Check DATABASE_URL.", err);
  }

  if (dbError) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">
          Site content is unavailable right now. The database is not configured
          or unreachable.
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">
          No profile data yet. Set up your profile in the admin panel.
        </p>
      </div>
    );
  }

  return (
    <PageTransition>
      <HomeContent
        profile={{
          fullName: profile.fullName,
          headline: profile.headline,
          summary: profile.summary,
          email: profile.email,
          githubUrl: profile.githubUrl,
          linkedinUrl: profile.linkedinUrl,
          profilePhotoUrl: profile.profilePhoto?.url || null,
        }}
        experiences={experiences.map((exp) => ({
          id: exp.id,
          roleTitle: exp.roleTitle,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate.toISOString(),
          endDate: exp.endDate?.toISOString() || null,
          techTags: exp.techTags,
        }))}
        projects={projects.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          shortDescription: p.shortDescription,
          techTags: p.techTags,
        }))}
      />
    </PageTransition>
  );
}
