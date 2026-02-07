import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProfileForm } from "./ProfileForm";
import type { Prisma } from "@prisma/client";

type ProfileWithPhoto = Prisma.ProfileGetPayload<{
  include: { profilePhoto: true };
}>;

export default async function AdminProfilePage() {
  let dbError = false;
  let profile: ProfileWithPhoto | null = null;

  try {
    profile = await prisma.profile.findFirst({
      include: { profilePhoto: true },
    });
  } catch (err) {
    dbError = true;
    console.error("[db] Admin profile query failed. Check DATABASE_URL.", err);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Profile</h1>
      {dbError && (
        <p className="text-sm text-muted-foreground mb-4">
          The database is not configured or unreachable. Set `DATABASE_URL` and run
          migrations to enable profile editing.
        </p>
      )}
      <GlassCard>
        <ProfileForm
          profile={
            profile
              ? {
                  fullName: profile.fullName,
                  headline: profile.headline,
                  summary: profile.summary,
                  location: profile.location || "",
                  email: profile.email,
                  phone: profile.phone || "",
                  websiteUrl: profile.websiteUrl || "",
                  linkedinUrl: profile.linkedinUrl || "",
                  githubUrl: profile.githubUrl || "",
                  profilePhotoId: profile.profilePhotoId || "",
                  profilePhotoUrl: profile.profilePhoto?.url || "",
                }
              : null
          }
        />
      </GlassCard>
    </div>
  );
}
