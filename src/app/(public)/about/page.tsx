import { prisma } from "@/lib/db";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "./AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "Learn more about me, my background, and what drives me.",
};

export default async function AboutPage() {
  let dbError = false;
  let about: Awaited<ReturnType<typeof prisma.about.findFirst>> = null;

  try {
    about = await prisma.about.findFirst();
  } catch (err) {
    dbError = true;
    console.error("[db] About page query failed. Check DATABASE_URL.", err);
  }

  if (dbError) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            About content is unavailable right now. The database is not configured
            or unreachable.
          </p>
        </div>
      </PageTransition>
    );
  }

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
