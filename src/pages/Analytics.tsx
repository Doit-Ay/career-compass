import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/layout/AppLayout";
import { ComingSoonSection } from "@/components/ui/ComingSoonSection";
import { BarChart3, PieChart, TrendingUp, Zap } from "lucide-react";

export default function Analytics() {
  // Fetch company distribution by type
  const { data: typeDistribution = [] } = useQuery({
    queryKey: ["analytics-type-distribution"],
    queryFn: async () => {
      const { data, error } = await supabase.from("companies").select("company_type");
      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        const type = item.company_type || "Unspecified";
        counts[type] = (counts[type] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);
    },
  });

  // Fetch tech stack frequency
  const { data: techStackFrequency = [] } = useQuery({
    queryKey: ["analytics-tech-stack"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_technologies").select("tech_stack");
      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        item.tech_stack?.forEach((tech: string) => {
          counts[tech] = (counts[tech] || 0) + 1;
        });
      });

      return Object.entries(counts)
        .map(([tech, count]) => ({ tech, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    },
  });

  // Fetch remote policy distribution
  const { data: remoteDistribution = [] } = useQuery({
    queryKey: ["analytics-remote-distribution"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_culture").select("remote_policy");
      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        const policy = item.remote_policy || "Not specified";
        counts[policy] = (counts[policy] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([policy, count]) => ({ policy, count }))
        .sort((a, b) => b.count - a.count);
    },
  });

  // Fetch work environment distribution
  const { data: workEnvironmentDistribution = [] } = useQuery({
    queryKey: ["analytics-work-environment"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_culture").select("work_environment");
      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        const env = item.work_environment || "Not specified";
        counts[env] = (counts[env] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([environment, count]) => ({ environment, count }))
        .sort((a, b) => b.count - a.count);
    },
  });

  const totalCompanies = typeDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <AppLayout>
      <div className="dcc-content">
        {/* Page header */}
        <div className="mb-6">
          <h1>Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aggregated insights from company data
          </p>
        </div>

        {/* Enabled analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Company Distribution */}
          <div className="dcc-card">
            <div className="dcc-section-header">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-muted-foreground" />
                <h3>Company Distribution by Type</h3>
              </div>
              <span className="text-xs text-muted-foreground">{totalCompanies} total</span>
            </div>
            {typeDistribution.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No data available</p>
            ) : (
              <div className="space-y-3">
                {typeDistribution.map((item) => {
                  const percentage = totalCompanies > 0 ? (item.count / totalCompanies) * 100 : 0;
                  return (
                    <div key={item.type}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{item.type}</span>
                        <span className="text-muted-foreground">
                          {item.count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tech Stack Frequency */}
          <div className="dcc-card">
            <div className="dcc-section-header">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3>Tech Stack Frequency</h3>
              </div>
            </div>
            {techStackFrequency.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No data available</p>
            ) : (
              <div className="space-y-2">
                {techStackFrequency.map((item) => (
                  <div key={item.tech} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.tech}</span>
                    <span className="dcc-badge dcc-badge-default">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remote Policy Distribution */}
          <div className="dcc-card">
            <div className="dcc-section-header">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3>Remote Policy Distribution</h3>
              </div>
            </div>
            {remoteDistribution.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No data available</p>
            ) : (
              <div className="space-y-2">
                {remoteDistribution.map((item) => (
                  <div key={item.policy} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.policy}</span>
                    <span className="dcc-badge dcc-badge-default">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Work Environment */}
          <div className="dcc-card">
            <div className="dcc-section-header">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3>Work Environment Indicators</h3>
              </div>
            </div>
            {workEnvironmentDistribution.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No data available</p>
            ) : (
              <div className="space-y-2">
                {workEnvironmentDistribution.map((item) => (
                  <div key={item.environment} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.environment}</span>
                    <span className="dcc-badge dcc-badge-default">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coming Soon analytics */}
        <h2 className="mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComingSoonSection
            title="Skill Trend Shifts"
            description="Track how skill requirements are changing across industries"
            reason="Requires skill datasets"
          >
            <div className="p-4 space-y-2">
              <div className="h-3 bg-secondary rounded w-full" />
              <div className="h-3 bg-secondary rounded w-4/5" />
              <div className="h-3 bg-secondary rounded w-3/5" />
            </div>
          </ComingSoonSection>

          <ComingSoonSection
            title="Outcome Correlations"
            description="Understand which factors correlate with placement success"
            reason="Requires outcome datasets"
          >
            <div className="p-4 flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-secondary" />
            </div>
          </ComingSoonSection>

          <ComingSoonSection
            title="Innovation Impact"
            description="Measure how innovation involvement affects career outcomes"
            reason="Requires innovation datasets"
          >
            <div className="p-4 flex items-center justify-center">
              <Zap className="h-12 w-12 text-secondary" />
            </div>
          </ComingSoonSection>
        </div>
      </div>
    </AppLayout>
  );
}
