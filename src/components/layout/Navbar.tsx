"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      className="hidden md:block fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="glass-strong mx-auto mt-4 max-w-4xl rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            Portfolio
          </Link>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm rounded-lg transition-colors duration-200",
                    isActive
                      ? "text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
            <div className="ml-2 border-l border-border pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
