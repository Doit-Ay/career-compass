import { AppLayout } from "@/components/layout/AppLayout";
import { ComingSoonBadge } from "@/components/ui/ComingSoonBadge";
import { Sparkles, Layers, Target, GitBranch, Lock } from "lucide-react";

export default function Skills() {
  const futureCapabilities = [
    {
      icon: Layers,
      title: "Company → Skill → Depth Mapping",
      description: "Understand which skills each company requires and at what proficiency level",
    },
    {
      icon: Target,
      title: "Role Expectations",
      description: "View skill requirements mapped to specific job roles across companies",
    },
    {
      icon: GitBranch,
      title: "Skill Overlap Analysis",
      description: "Identify transferable skills across different industries and company types",
    },
  ];

  return (
    <AppLayout>
      <div className="dcc-content">
        {/* Page header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1>Skills</h1>
              <ComingSoonBadge />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Skill mapping and career readiness tools
            </p>
          </div>
        </div>

        {/* Disabled state explanation */}
        <div className="dcc-card mb-6 border-dashed">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <Lock className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="mb-1">This section is currently disabled</h3>
              <p className="text-sm text-muted-foreground">
                Skills functionality will activate when skill and role tables are integrated into the platform. 
                This enables accurate mapping between company requirements and individual capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Future capabilities roadmap */}
        <div className="mb-6">
          <h2 className="mb-4">Planned Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {futureCapabilities.map((capability) => (
              <div key={capability.title} className="dcc-card opacity-60">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                  <capability.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h4 className="mb-1">{capability.title}</h4>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data requirements */}
        <div className="dcc-card bg-secondary/30">
          <h4 className="mb-3">Required Data Integration</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              Skills taxonomy table with hierarchical categorization
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              Role definitions table with skill requirements
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              Company-role mapping with proficiency expectations
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              Student skill assessments and certifications
            </li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
