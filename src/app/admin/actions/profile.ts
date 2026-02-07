"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { profileSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  await requireAdmin();

  const data = profileSchema.parse({
    fullName: formData.get("fullName"),
    headline: formData.get("headline"),
    summary: formData.get("summary"),
    location: formData.get("location") || "",
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    websiteUrl: formData.get("websiteUrl") || "",
    linkedinUrl: formData.get("linkedinUrl") || "",
    githubUrl: formData.get("githubUrl") || "",
  });

  const profilePhotoId = formData.get("profilePhotoId") as string;

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {
      ...data,
      profilePhotoId: profilePhotoId || null,
    },
    create: {
      id: "singleton",
      ...data,
      profilePhotoId: profilePhotoId || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/contact");
}
