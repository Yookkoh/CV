import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProfileForm } from "./ProfileForm";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst({
    include: { profilePhoto: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Profile</h1>
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
