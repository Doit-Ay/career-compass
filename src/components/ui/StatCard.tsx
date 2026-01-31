import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("dcc-stat", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Icon className="h-4 w-4 text-accent-foreground" />
          </div>
        )}
      </div>
      {trend && (
        <p
          className={cn(
            "text-xs mt-2",
            trend.positive ? "text-dcc-success" : "text-muted-foreground"
          )}
        >
          {trend.value}
        </p>
      )}
    </div>
  );
}
