export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const MOBILE_DOCK_ITEMS = [
  { label: "Home", href: "/", icon: "Home" as const },
  { label: "Experience", href: "/experience", icon: "Briefcase" as const },
  { label: "Skills", href: "/skills", icon: "Zap" as const },
  { label: "Projects", href: "/projects", icon: "FolderOpen" as const },
  { label: "Contact", href: "/contact", icon: "Mail" as const },
];
