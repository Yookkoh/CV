"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { experienceSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createExperience(formData: FormData) {
  await requireAdmin();

  const raw = experienceSchema.parse({
    company: formData.get("company"),
    roleTitle: formData.get("roleTitle"),
    location: formData.get("location") || "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || "",
    employmentType: formData.get("employmentType") || "",
    description: formData.get("description") || "",
    highlights: formData.get("highlights") || "",
    techTags: formData.get("techTags") || "",
    isPublished: formData.get("isPublished") === "true",
  });

  const maxOrder = await prisma.experience.aggregate({ _max: { order: true } });

  await prisma.experience.create({
    data: {
      company: raw.company,
      roleTitle: raw.roleTitle,
      location: raw.location || null,
      startDate: new Date(raw.startDate),
      endDate: raw.endDate ? new Date(raw.endDate) : null,
      employmentType: raw.employmentType || null,
      description: raw.description || null,
      highlights: raw.highlights
        ? raw.highlights.split("\n").filter(Boolean)
        : [],
      techTags: raw.techTags
        ? raw.techTags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      isPublished: raw.isPublished,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/experience");
  revalidatePath("/");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();

  const raw = experienceSchema.parse({
    company: formData.get("company"),
    roleTitle: formData.get("roleTitle"),
    location: formData.get("location") || "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || "",
    employmentType: formData.get("employmentType") || "",
    description: formData.get("description") || "",
    highlights: formData.get("highlights") || "",
    techTags: formData.get("techTags") || "",
    isPublished: formData.get("isPublished") === "true",
  });

  await prisma.experience.update({
    where: { id },
    data: {
      company: raw.company,
      roleTitle: raw.roleTitle,
      location: raw.location || null,
      startDate: new Date(raw.startDate),
      endDate: raw.endDate ? new Date(raw.endDate) : null,
      employmentType: raw.employmentType || null,
      description: raw.description || null,
      highlights: raw.highlights
        ? raw.highlights.split("\n").filter(Boolean)
        : [],
      techTags: raw.techTags
        ? raw.techTags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      isPublished: raw.isPublished,
    },
  });

  revalidatePath("/experience");
  revalidatePath("/");
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function reorderExperiences(ids: string[]) {
  await requireAdmin();
  await Promise.all(
    ids.map((id, index) =>
      prisma.experience.update({ where: { id }, data: { order: index } })
    )
  );
  revalidatePath("/experience");
  revalidatePath("/");
}
