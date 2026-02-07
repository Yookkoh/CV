"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { projectSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  await requireAdmin();

  const raw = projectSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    content: formData.get("content"),
    techTags: formData.get("techTags") || "",
    repoUrl: formData.get("repoUrl") || "",
    liveUrl: formData.get("liveUrl") || "",
    featured: formData.get("featured") === "true",
    isPublished: formData.get("isPublished") === "true",
  });

  const maxOrder = await prisma.project.aggregate({ _max: { order: true } });

  await prisma.project.create({
    data: {
      title: raw.title,
      slug: raw.slug,
      shortDescription: raw.shortDescription,
      content: raw.content,
      techTags: raw.techTags
        ? raw.techTags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      repoUrl: raw.repoUrl || null,
      liveUrl: raw.liveUrl || null,
      featured: raw.featured,
      isPublished: raw.isPublished,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const raw = projectSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    content: formData.get("content"),
    techTags: formData.get("techTags") || "",
    repoUrl: formData.get("repoUrl") || "",
    liveUrl: formData.get("liveUrl") || "",
    featured: formData.get("featured") === "true",
    isPublished: formData.get("isPublished") === "true",
  });

  await prisma.project.update({
    where: { id },
    data: {
      title: raw.title,
      slug: raw.slug,
      shortDescription: raw.shortDescription,
      content: raw.content,
      techTags: raw.techTags
        ? raw.techTags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      repoUrl: raw.repoUrl || null,
      liveUrl: raw.liveUrl || null,
      featured: raw.featured,
      isPublished: raw.isPublished,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${raw.slug}`);
  revalidatePath("/");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/");
}
