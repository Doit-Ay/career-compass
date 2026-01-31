import { ReactNode } from "react";
import { Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonSectionProps {
  title: string;
  description: string;
  reason: string;
  children?: ReactNode;
  className?: string;
}

export function ComingSoonSection({
  title,
  description,
  reason,
  children,
  className,
}: ComingSoonSectionProps) {
  return (
    <div className={cn("dcc-card relative overflow-hidden", className)}>
      {/* Background content (blurred) */}
      <div className="opacity-40 pointer-events-none select-none">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-3">
          <Lock className="h-5 w-5 text-accent-foreground" />
        </div>
        <h4 className="text-sm font-medium text-foreground mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground text-center max-w-xs mb-3">
          {description}
        </p>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent text-accent-foreground">
          <Clock className="h-3 w-3" />
          {reason}
        </div>
      </div>
    </div>
  );
}
