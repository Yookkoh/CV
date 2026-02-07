import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactContent } from "./ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch with me.",
};

export default async function ContactPage() {
  let dbError = false;
  let profile: Awaited<ReturnType<typeof prisma.profile.findFirst>> = null;

  try {
    profile = await prisma.profile.findFirst();
  } catch (err) {
    dbError = true;
    console.error("[db] Contact page query failed. Check DATABASE_URL.", err);
  }

  if (dbError) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Contact info is unavailable right now. The database is not configured
            or unreachable.
          </p>
        </div>
      </PageTransition>
    );
  }

  if (!profile) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Contact info coming soon.</p>
        </div>
      </PageTransition>
    );
  }

  const contactItems = [
    {
      icon: "Mail",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    profile.phone
      ? {
          icon: "Phone",
          label: "Phone",
          value: profile.phone,
          href: `tel:${profile.phone}`,
        }
      : null,
    profile.location
      ? { icon: "MapPin", label: "Location", value: profile.location, href: null }
      : null,
    profile.linkedinUrl
      ? {
          icon: "Linkedin",
          label: "LinkedIn",
          value: "LinkedIn Profile",
          href: profile.linkedinUrl,
        }
      : null,
    profile.githubUrl
      ? {
          icon: "Github",
          label: "GitHub",
          value: "GitHub Profile",
          href: profile.githubUrl,
        }
      : null,
    profile.websiteUrl
      ? {
          icon: "Globe",
          label: "Website",
          value: profile.websiteUrl,
          href: profile.websiteUrl,
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: string;
    label: string;
    value: string;
    href: string | null;
  }>;

  return (
    <PageTransition>
      <ContactContent items={contactItems} />
    </PageTransition>
  );
}
