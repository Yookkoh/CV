import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "border border-border text-muted-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
