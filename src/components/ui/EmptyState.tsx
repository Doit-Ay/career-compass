import { ReactNode } from "react";
import { LucideIcon, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("dcc-empty", className)}>
      <Icon className="dcc-empty-icon" />
      <p className="dcc-empty-title">{title}</p>
      {description && <p className="dcc-empty-description">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
