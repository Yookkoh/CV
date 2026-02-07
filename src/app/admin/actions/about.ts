"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { aboutSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateAbout(formData: FormData) {
  await requireAdmin();

  const data = aboutSchema.parse({
    content: formData.get("content"),
  });

  await prisma.about.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/about");
}
