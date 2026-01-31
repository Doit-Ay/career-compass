-- Companies base table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  company_type TEXT,
  category TEXT,
  employee_size TEXT,
  headquarters_address TEXT,
  operating_countries TEXT[],
  website_url TEXT,
  founded_year INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Brand Reputation
CREATE TABLE public.company_brand_reputation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  brand_recognition TEXT,
  industry_awards TEXT[],
  media_mentions TEXT[],
  social_media_presence TEXT,
  employer_brand_rating TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Business
CREATE TABLE public.company_business (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  business_model TEXT,
  revenue_streams TEXT[],
  target_markets TEXT[],
  competitive_advantage TEXT,
  strategic_partnerships TEXT[],
  growth_strategy TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Compensation
CREATE TABLE public.company_compensation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  salary_range_min INTEGER,
  salary_range_max INTEGER,
  bonus_structure TEXT,
  equity_options BOOLEAN DEFAULT false,
  benefits TEXT[],
  pay_frequency TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Culture
CREATE TABLE public.company_culture (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  work_environment TEXT,
  remote_policy TEXT,
  dress_code TEXT,
  core_values TEXT[],
  team_activities TEXT[],
  diversity_initiatives TEXT[],
  work_life_balance TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Financials
CREATE TABLE public.company_financials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  annual_revenue TEXT,
  funding_stage TEXT,
  total_funding TEXT,
  profitability_status TEXT,
  fiscal_year_end TEXT,
  public_or_private TEXT,
  stock_symbol TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Logistics
CREATE TABLE public.company_logistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  office_locations TEXT[],
  relocation_support BOOLEAN DEFAULT false,
  visa_sponsorship BOOLEAN DEFAULT false,
  travel_requirements TEXT,
  work_hours TEXT,
  timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company People
CREATE TABLE public.company_people (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  ceo_name TEXT,
  leadership_team TEXT[],
  employee_count INTEGER,
  hiring_rate TEXT,
  attrition_rate TEXT,
  average_tenure TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Talent Growth
CREATE TABLE public.company_talent_growth (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  training_programs TEXT[],
  mentorship_available BOOLEAN DEFAULT false,
  promotion_frequency TEXT,
  learning_budget TEXT,
  career_paths TEXT[],
  certification_support BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Technologies
CREATE TABLE public.company_technologies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  tech_stack TEXT[],
  development_methodology TEXT,
  cloud_providers TEXT[],
  engineering_practices TEXT[],
  innovation_focus TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read access for this platform)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_brand_reputation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_business ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_compensation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_culture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_logistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_talent_growth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_technologies ENABLE ROW LEVEL SECURITY;

-- Public read policies for all tables
CREATE POLICY "Public read access for companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public read access for brand_reputation" ON public.company_brand_reputation FOR SELECT USING (true);
CREATE POLICY "Public read access for business" ON public.company_business FOR SELECT USING (true);
CREATE POLICY "Public read access for compensation" ON public.company_compensation FOR SELECT USING (true);
CREATE POLICY "Public read access for culture" ON public.company_culture FOR SELECT USING (true);
CREATE POLICY "Public read access for financials" ON public.company_financials FOR SELECT USING (true);
CREATE POLICY "Public read access for logistics" ON public.company_logistics FOR SELECT USING (true);
CREATE POLICY "Public read access for people" ON public.company_people FOR SELECT USING (true);
CREATE POLICY "Public read access for talent_growth" ON public.company_talent_growth FOR SELECT USING (true);
CREATE POLICY "Public read access for technologies" ON public.company_technologies FOR SELECT USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_companies_type ON public.companies(company_type);
CREATE INDEX idx_companies_category ON public.companies(category);
CREATE INDEX idx_company_brand_reputation_company_id ON public.company_brand_reputation(company_id);
CREATE INDEX idx_company_business_company_id ON public.company_business(company_id);
CREATE INDEX idx_company_compensation_company_id ON public.company_compensation(company_id);
CREATE INDEX idx_company_culture_company_id ON public.company_culture(company_id);
CREATE INDEX idx_company_financials_company_id ON public.company_financials(company_id);
CREATE INDEX idx_company_logistics_company_id ON public.company_logistics(company_id);
CREATE INDEX idx_company_people_company_id ON public.company_people(company_id);
CREATE INDEX idx_company_talent_growth_company_id ON public.company_talent_growth(company_id);
CREATE INDEX idx_company_technologies_company_id ON public.company_technologies(company_id);