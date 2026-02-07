import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  headline: z.string().min(1, "Headline is required"),
  summary: z.string().min(1, "Summary is required"),
  location: z.string().optional().default(""),
  email: z.string().email("Invalid email"),
  phone: z.string().optional().default(""),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
});

export const aboutSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  roleTitle: z.string().min(1, "Role title is required"),
  location: z.string().optional().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().default(""),
  employmentType: z.string().optional().default(""),
  description: z.string().optional().default(""),
  highlights: z.string().optional().default(""),
  techTags: z.string().optional().default(""),
  isPublished: z.boolean().optional().default(true),
});

export const skillCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const skillSchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(1, "Skill name is required"),
  level: z.coerce.number().min(0).max(5).optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  content: z.string().min(1, "Content is required"),
  techTags: z.string().optional().default(""),
  repoUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().optional().default(false),
  isPublished: z.boolean().optional().default(true),
});

export const siteSettingsSchema = z.object({
  siteTitle: z.string().min(1, "Site title is required"),
  siteDescription: z.string().min(1, "Description is required"),
});
