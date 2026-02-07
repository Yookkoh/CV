import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  hover?: boolean;
}

export function GlassCard({
  className,
  strong,
  hover,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        strong ? "glass-strong" : "glass",
        hover && "glass-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
