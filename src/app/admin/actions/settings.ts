"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  await requireAdmin();

  const data = siteSettingsSchema.parse({
    siteTitle: formData.get("siteTitle"),
    siteDescription: formData.get("siteDescription"),
  });

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/");
}
