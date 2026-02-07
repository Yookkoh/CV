"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { skillCategorySchema, skillSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const data = skillCategorySchema.parse({ name: formData.get("name") });
  const maxOrder = await prisma.skillCategory.aggregate({
    _max: { order: true },
  });
  await prisma.skillCategory.create({
    data: { name: data.name, order: (maxOrder._max.order ?? -1) + 1 },
  });
  revalidatePath("/skills");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAdmin();
  const data = skillCategorySchema.parse({ name: formData.get("name") });
  await prisma.skillCategory.update({ where: { id }, data });
  revalidatePath("/skills");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath("/skills");
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const data = skillSchema.parse({
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    level: formData.get("level") ? Number(formData.get("level")) : undefined,
  });
  const maxOrder = await prisma.skill.aggregate({
    _max: { order: true },
    where: { categoryId: data.categoryId },
  });
  await prisma.skill.create({
    data: {
      ...data,
      level: data.level ?? null,
      tags: [],
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
  revalidatePath("/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();
  const data = skillSchema.parse({
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    level: formData.get("level") ? Number(formData.get("level")) : undefined,
  });
  await prisma.skill.update({
    where: { id },
    data: { name: data.name, level: data.level ?? null },
  });
  revalidatePath("/skills");
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/skills");
}
