import { AppLayout } from "@/components/layout/AppLayout";
import { ComingSoonBadge } from "@/components/ui/ComingSoonBadge";
import { Lightbulb, Lock, Layers, Building, Microscope, FileText, Award } from "lucide-react";

const innovationTiers = [
  {
    tier: 1,
    title: "Foundation",
    description: "Basic understanding and awareness of innovation concepts",
    enabled: false,
  },
  {
    tier: 2,
    title: "Application",
    description: "Applying innovation frameworks to academic projects",
    enabled: false,
  },
  {
    tier: 3,
    title: "Industry Involvement",
    description: "Participating in industry-sponsored innovation challenges",
    icon: Building,
    enabled: false,
    highlight: true,
  },
  {
    tier: 4,
    title: "Research Contribution",
    description: "Contributing to research papers and IP development",
    icon: Microscope,
    enabled: false,
  },
  {
    tier: 5,
    title: "Leadership",
    description: "Leading innovation initiatives and mentoring others",
    icon: Award,
    enabled: false,
  },
];

export default function Innovation() {
  return (
    <AppLayout>
      <div className="dcc-content">
        {/* Page header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1>Innovation</h1>
              <ComingSoonBadge />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Five-tier innovation framework and IP roadmap
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
              <h3 className="mb-1">Innovation tracking is currently disabled</h3>
              <p className="text-sm text-muted-foreground">
                This section will become active when innovation and research datasets are integrated. 
                It will track student participation across the five-tier innovation framework.
              </p>
            </div>
          </div>
        </div>

        {/* Five-tier framework visualization */}
        <div className="mb-6">
          <h2 className="mb-4">Five-Tier Innovation Framework</h2>
          <div className="space-y-3">
            {innovationTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`dcc-card opacity-60 flex items-center gap-4 ${
                  tier.highlight ? "border-primary/30" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-muted-foreground">T{tier.tier}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4>{tier.title}</h4>
                    {tier.highlight && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        Industry Entry Point
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <div className="text-xs text-muted-foreground">Disabled</div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="dcc-card opacity-60">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3>IP & Research Roadmap</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Track intellectual property development and research publication progress.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Patent filing pipeline
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Research paper submissions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Industry collaboration projects
              </li>
            </ul>
          </div>

          <div className="dcc-card opacity-60">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <h3>Data Requirements</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The following datasets are required to activate innovation tracking:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Student innovation participation records
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Project and challenge submissions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Industry partnership agreements
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Research output tracking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
