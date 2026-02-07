"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/admin/actions/profile";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/Button";

interface ProfileData {
  fullName: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  websiteUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  profilePhotoId: string;
  profilePhotoUrl: string;
}

export function ProfileForm({ profile }: { profile: ProfileData | null }) {
  const [photoId, setPhotoId] = useState(profile?.profilePhotoId || "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    formData.set("profilePhotoId", photoId);
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2">Profile Photo</label>
        <ImageUpload
          currentUrl={profile?.profilePhotoUrl || null}
          onUploaded={(assetId) => setPhotoId(assetId)}
          onRemoved={() => setPhotoId("")}
        />
      </div>
      <AdminFormField
        label="Full Name"
        name="fullName"
        defaultValue={profile?.fullName}
        required
      />
      <AdminFormField
        label="Headline"
        name="headline"
        defaultValue={profile?.headline}
        placeholder="e.g. Full-Stack Developer"
        required
      />
      <AdminFormField
        label="Summary"
        name="summary"
        defaultValue={profile?.summary}
        textarea
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminFormField
          label="Email"
          name="email"
          type="email"
          defaultValue={profile?.email}
          required
        />
        <AdminFormField
          label="Phone"
          name="phone"
          defaultValue={profile?.phone}
        />
      </div>
      <AdminFormField
        label="Location"
        name="location"
        defaultValue={profile?.location}
        placeholder="e.g. San Francisco, CA"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminFormField
          label="LinkedIn URL"
          name="linkedinUrl"
          defaultValue={profile?.linkedinUrl}
          placeholder="https://linkedin.com/in/..."
        />
        <AdminFormField
          label="GitHub URL"
          name="githubUrl"
          defaultValue={profile?.githubUrl}
          placeholder="https://github.com/..."
        />
        <AdminFormField
          label="Website URL"
          name="websiteUrl"
          defaultValue={profile?.websiteUrl}
          placeholder="https://..."
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
