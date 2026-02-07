import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileDock } from "@/components/layout/MobileDock";
import { DotGridBackground } from "@/components/layout/DotGridBackground";
import { Footer } from "@/components/layout/Footer";

// This app reads from a database (Prisma) on most routes. Force SSR so builds
// don't require a live DB connection for static prerendering.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "John Doe | Full-Stack Developer",
  description:
    "Professional portfolio of John Doe - Full-Stack Developer specializing in React, Next.js, and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <DotGridBackground />
        <Navbar />
        <main className="max-w-4xl mx-auto px-5 pt-6 md:pt-28 pb-20 md:pb-12">
          {children}
        </main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  );
}
