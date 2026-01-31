import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export function ComingSoonBadge({ className, size = "md" }: ComingSoonBadgeProps) {
  return (
    <span
      className={cn(
        "dcc-coming-soon",
        size === "sm" && "text-[10px] px-1.5 py-0.5",
        className
      )}
    >
      <Clock className={cn("shrink-0", size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3")} />
      Coming Soon
    </span>
  );
}
