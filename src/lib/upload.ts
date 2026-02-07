import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function getUploadDir() {
  return path.join(process.cwd(), "public", "uploads");
}

export async function saveFile(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} not allowed`);
  }
  if (file.size > MAX_SIZE) {
    throw new Error("File too large (max 5MB)");
  }

  const uploadDir = getUploadDir();
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const ext = file.name.split(".").pop() || "bin";
  const uniqueName = `${crypto.randomUUID()}.${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return {
    url: `/uploads/${uniqueName}`,
    type: file.type.startsWith("image/") ? "image" : "pdf",
  };
}

export async function deleteFile(url: string) {
  const filePath = path.join(process.cwd(), "public", url);
  if (existsSync(filePath)) {
    await unlink(filePath);
  }
}
