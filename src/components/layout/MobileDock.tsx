"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Briefcase, Zap, FolderOpen, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const DOCK_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Experience", href: "/experience", icon: Briefcase },
  { label: "Skills", href: "/skills", icon: Zap },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function MobileDock() {
  const pathname = usePathname();

  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="glass-strong mx-3 mb-3 rounded-2xl px-1.5 py-2">
        <div className="flex items-center justify-around">
          {DOCK_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                </motion.div>
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-foreground"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
          <div className="flex flex-col items-center gap-0.5">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
