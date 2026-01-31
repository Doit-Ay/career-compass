import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/ui/StatCard";
import { ComingSoonSection } from "@/components/ui/ComingSoonSection";
import { Building2, FolderTree, Clock, Users, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Fetch total company count
  const { data: companiesCount = 0 } = useQuery({
    queryKey: ["companies-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("companies")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  // Fetch companies by type
  const { data: companiesByType = [] } = useQuery({
    queryKey: ["companies-by-type"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("company_type");
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

  // Fetch companies by category
  const { data: companiesByCategory = [] } = useQuery({
    queryKey: ["companies-by-category"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("category");
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        const category = item.category || "Unspecified";
        counts[category] = (counts[category] || 0) + 1;
      });
      
      return Object.entries(counts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);
    },
  });

  // Fetch recently added companies
  const { data: recentCompanies = [] } = useQuery({
    queryKey: ["recent-companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, logo_url, company_type, category, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <AppLayout>
      <div className="dcc-content">
        {/* Page header */}
        <div className="mb-6">
          <h1>System Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Platform-wide metrics and insights
          </p>
        </div>

        {/* Stats grid */}
        <div className="dcc-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            label="Total Companies"
            value={companiesCount}
            icon={Building2}
          />
          <StatCard
            label="Company Types"
            value={companiesByType.length}
            icon={FolderTree}
          />
          <StatCard
            label="Categories"
            value={companiesByCategory.length}
            icon={FolderTree}
          />
          <StatCard
            label="Last Updated"
            value="Today"
            icon={Clock}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Companies by Type */}
          <div className="dcc-card">
            <div className="dcc-section-header">
              <h3>Companies by Type</h3>
            </div>
            {companiesByType.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No data available</p>
            ) : (
              <div className="space-y-3">
                {companiesByType.slice(0, 5).map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.type}</span>
                    <span className="text-sm font-medium text-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Companies by Category */}
          <div className="dcc-card">
            <div className="dcc-section-header">
              <h3>Companies by Category</h3>
            </div>
            {companiesByCategory.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No data available</p>
            ) : (
              <div className="space-y-3">
                {companiesByCategory.slice(0, 5).map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.category}</span>
                    <span className="text-sm font-medium text-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recently Added Companies */}
        <div className="dcc-card mb-6">
          <div className="dcc-section-header">
            <h3>Recently Added Companies</h3>
            <Link to="/companies" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentCompanies.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No companies added yet</p>
          ) : (
            <div className="space-y-2">
              {recentCompanies.map((company) => (
                <Link
                  key={company.id}
                  to={`/companies/${company.id}`}
                  className="dcc-list-item"
                >
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center overflow-hidden">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {company.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {company.company_type || "—"} · {company.category || "—"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Coming Soon sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComingSoonSection
            title="Employability Snapshot"
            description="Your personalized employability score and readiness metrics"
            reason="Requires student datasets"
          >
            <div className="space-y-3 p-4">
              <div className="h-4 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-8 bg-secondary rounded w-full" />
            </div>
          </ComingSoonSection>

          <ComingSoonSection
            title="Skill Readiness"
            description="Track your skill development progress against industry requirements"
            reason="Requires skill datasets"
          >
            <div className="flex items-center justify-center p-4">
              <Users className="h-12 w-12 text-secondary" />
            </div>
          </ComingSoonSection>

          <ComingSoonSection
            title="Personalized Focus Areas"
            description="AI-powered recommendations for your career growth"
            reason="Requires student & skill datasets"
          >
            <div className="flex items-center justify-center p-4">
              <Target className="h-12 w-12 text-secondary" />
            </div>
          </ComingSoonSection>
        </div>
      </div>
    </AppLayout>
  );
}
