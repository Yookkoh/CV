import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "./AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "Learn more about me, my background, and what drives me.",
};

export default async function AboutPage() {
  const about = await prisma.about.findFirst();

  if (!about) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <p className="text-muted-foreground">About content coming soon.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <AboutContent content={about.content} />
    </PageTransition>
  );
}
