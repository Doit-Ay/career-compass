import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/layout/AppLayout";
import { EmptyState } from "@/components/ui/EmptyState";
import { 
  Building2, 
  ArrowLeft, 
  Globe, 
  MapPin, 
  Calendar,
  ExternalLink,
  Users,
  Briefcase,
  Code,
  Heart,
  TrendingUp,
  DollarSign,
  Award,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "business", label: "Business & Strategy", icon: Briefcase },
  { id: "technology", label: "Technology", icon: Code },
  { id: "people", label: "People & Leadership", icon: Users },
  { id: "culture", label: "Culture", icon: Heart },
  { id: "growth", label: "Talent & Growth", icon: TrendingUp },
  { id: "compensation", label: "Compensation & Logistics", icon: DollarSign },
  { id: "financials", label: "Financials & Brand", icon: Award },
] as const;

type TabId = typeof TABS[number]["id"];

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Fetch company data
  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Fetch related data
  const { data: business } = useQuery({
    queryKey: ["company-business", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_business")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: technologies } = useQuery({
    queryKey: ["company-technologies", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_technologies")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: people } = useQuery({
    queryKey: ["company-people", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_people")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: culture } = useQuery({
    queryKey: ["company-culture", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_culture")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: talentGrowth } = useQuery({
    queryKey: ["company-talent-growth", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_talent_growth")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: compensation } = useQuery({
    queryKey: ["company-compensation", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_compensation")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: logistics } = useQuery({
    queryKey: ["company-logistics", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_logistics")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: financials } = useQuery({
    queryKey: ["company-financials", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_financials")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  const { data: brandReputation } = useQuery({
    queryKey: ["company-brand-reputation", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("company_brand_reputation")
        .select("*")
        .eq("company_id", id)
        .single();
      return data;
    },
    enabled: !!id,
  });

  if (companyLoading) {
    return (
      <AppLayout>
        <div className="dcc-content">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary rounded w-1/4" />
            <div className="h-24 bg-secondary rounded" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!company) {
    return (
      <AppLayout>
        <div className="dcc-content">
          <EmptyState
            icon={Building2}
            title="Company not found"
            description="The company you're looking for doesn't exist"
            action={
              <Link to="/companies" className="text-sm text-primary hover:underline">
                Back to companies
              </Link>
            }
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="dcc-content">
        {/* Back link */}
        <Link
          to="/companies"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to companies
        </Link>

        {/* Company header */}
        <div className="dcc-card mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="mb-1">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {company.company_type && (
                  <span className="dcc-badge dcc-badge-primary">{company.company_type}</span>
                )}
                {company.category && (
                  <span className="dcc-badge dcc-badge-default">{company.category}</span>
                )}
                {company.employee_size && (
                  <span className="dcc-badge dcc-badge-default">{company.employee_size}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {company.headquarters_address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{company.headquarters_address}</span>
                  </div>
                )}
                {company.founded_year && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Founded {company.founded_year}</span>
                  </div>
                )}
                {company.website_url && (
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dcc-tabs overflow-x-auto mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn("dcc-tab whitespace-nowrap")}
              data-active={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="dcc-card">
          {activeTab === "overview" && (
            <OverviewTab company={company} />
          )}
          {activeTab === "business" && (
            <BusinessTab data={business} />
          )}
          {activeTab === "technology" && (
            <TechnologyTab data={technologies} />
          )}
          {activeTab === "people" && (
            <PeopleTab data={people} />
          )}
          {activeTab === "culture" && (
            <CultureTab data={culture} />
          )}
          {activeTab === "growth" && (
            <TalentGrowthTab data={talentGrowth} />
          )}
          {activeTab === "compensation" && (
            <CompensationLogisticsTab compensation={compensation} logistics={logistics} />
          )}
          {activeTab === "financials" && (
            <FinancialsTab financials={financials} brandReputation={brandReputation} />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

// Data field component
function DataField({ label, value }: { label: string; value: any }) {
  if (value === null || value === undefined || value === "") {
    return (
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-sm text-muted-foreground/70">Not available</p>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {label}
        </p>
        {value.length === 0 ? (
          <p className="text-sm text-muted-foreground/70">Not available</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {value.map((item, i) => (
              <span key={i} className="dcc-badge dcc-badge-default">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-sm text-foreground">{value ? "Yes" : "No"}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}

// Tab components
function OverviewTab({ company }: { company: any }) {
  return (
    <div className="space-y-6">
      {company.description && (
        <div>
          <h4 className="mb-2">About</h4>
          <p className="text-sm text-muted-foreground">{company.description}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataField label="Company Type" value={company.company_type} />
        <DataField label="Category" value={company.category} />
        <DataField label="Employee Size" value={company.employee_size} />
        <DataField label="Headquarters" value={company.headquarters_address} />
        <DataField label="Founded" value={company.founded_year} />
        <DataField label="Operating Countries" value={company.operating_countries} />
      </div>
    </div>
  );
}

function BusinessTab({ data }: { data: any }) {
  if (!data) {
    return <EmptyState title="No business data available" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataField label="Business Model" value={data.business_model} />
      <DataField label="Competitive Advantage" value={data.competitive_advantage} />
      <DataField label="Growth Strategy" value={data.growth_strategy} />
      <DataField label="Revenue Streams" value={data.revenue_streams} />
      <DataField label="Target Markets" value={data.target_markets} />
      <DataField label="Strategic Partnerships" value={data.strategic_partnerships} />
    </div>
  );
}

function TechnologyTab({ data }: { data: any }) {
  if (!data) {
    return <EmptyState title="No technology data available" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataField label="Tech Stack" value={data.tech_stack} />
      <DataField label="Development Methodology" value={data.development_methodology} />
      <DataField label="Cloud Providers" value={data.cloud_providers} />
      <DataField label="Engineering Practices" value={data.engineering_practices} />
      <DataField label="Innovation Focus" value={data.innovation_focus} />
    </div>
  );
}

function PeopleTab({ data }: { data: any }) {
  if (!data) {
    return <EmptyState title="No people data available" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataField label="CEO" value={data.ceo_name} />
      <DataField label="Leadership Team" value={data.leadership_team} />
      <DataField label="Employee Count" value={data.employee_count} />
      <DataField label="Hiring Rate" value={data.hiring_rate} />
      <DataField label="Attrition Rate" value={data.attrition_rate} />
      <DataField label="Average Tenure" value={data.average_tenure} />
    </div>
  );
}

function CultureTab({ data }: { data: any }) {
  if (!data) {
    return <EmptyState title="No culture data available" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataField label="Work Environment" value={data.work_environment} />
      <DataField label="Remote Policy" value={data.remote_policy} />
      <DataField label="Dress Code" value={data.dress_code} />
      <DataField label="Work-Life Balance" value={data.work_life_balance} />
      <DataField label="Core Values" value={data.core_values} />
      <DataField label="Team Activities" value={data.team_activities} />
      <DataField label="Diversity Initiatives" value={data.diversity_initiatives} />
    </div>
  );
}

function TalentGrowthTab({ data }: { data: any }) {
  if (!data) {
    return <EmptyState title="No talent growth data available" />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DataField label="Training Programs" value={data.training_programs} />
      <DataField label="Mentorship Available" value={data.mentorship_available} />
      <DataField label="Promotion Frequency" value={data.promotion_frequency} />
      <DataField label="Learning Budget" value={data.learning_budget} />
      <DataField label="Career Paths" value={data.career_paths} />
      <DataField label="Certification Support" value={data.certification_support} />
    </div>
  );
}

function CompensationLogisticsTab({ compensation, logistics }: { compensation: any; logistics: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-4">Compensation</h4>
        {!compensation ? (
          <p className="text-sm text-muted-foreground">No compensation data available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataField 
              label="Salary Range" 
              value={
                compensation.salary_range_min && compensation.salary_range_max
                  ? `$${compensation.salary_range_min.toLocaleString()} - $${compensation.salary_range_max.toLocaleString()}`
                  : null
              } 
            />
            <DataField label="Bonus Structure" value={compensation.bonus_structure} />
            <DataField label="Equity Options" value={compensation.equity_options} />
            <DataField label="Pay Frequency" value={compensation.pay_frequency} />
            <DataField label="Benefits" value={compensation.benefits} />
          </div>
        )}
      </div>
      <div>
        <h4 className="mb-4">Logistics</h4>
        {!logistics ? (
          <p className="text-sm text-muted-foreground">No logistics data available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataField label="Office Locations" value={logistics.office_locations} />
            <DataField label="Relocation Support" value={logistics.relocation_support} />
            <DataField label="Visa Sponsorship" value={logistics.visa_sponsorship} />
            <DataField label="Travel Requirements" value={logistics.travel_requirements} />
            <DataField label="Work Hours" value={logistics.work_hours} />
            <DataField label="Timezone" value={logistics.timezone} />
          </div>
        )}
      </div>
    </div>
  );
}

function FinancialsTab({ financials, brandReputation }: { financials: any; brandReputation: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-4">Financials</h4>
        {!financials ? (
          <p className="text-sm text-muted-foreground">No financial data available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataField label="Annual Revenue" value={financials.annual_revenue} />
            <DataField label="Funding Stage" value={financials.funding_stage} />
            <DataField label="Total Funding" value={financials.total_funding} />
            <DataField label="Profitability Status" value={financials.profitability_status} />
            <DataField label="Public/Private" value={financials.public_or_private} />
            <DataField label="Stock Symbol" value={financials.stock_symbol} />
          </div>
        )}
      </div>
      <div>
        <h4 className="mb-4">Brand Reputation</h4>
        {!brandReputation ? (
          <p className="text-sm text-muted-foreground">No brand reputation data available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataField label="Brand Recognition" value={brandReputation.brand_recognition} />
            <DataField label="Employer Brand Rating" value={brandReputation.employer_brand_rating} />
            <DataField label="Social Media Presence" value={brandReputation.social_media_presence} />
            <DataField label="Industry Awards" value={brandReputation.industry_awards} />
            <DataField label="Media Mentions" value={brandReputation.media_mentions} />
          </div>
        )}
      </div>
    </div>
  );
}
