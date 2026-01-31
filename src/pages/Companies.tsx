import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/layout/AppLayout";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2, MapPin, Users, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  company_type: string | null;
  category: string | null;
  employee_size: string | null;
  headquarters_address: string | null;
  operating_countries: string[] | null;
}

export default function Companies() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Fetch all companies
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, logo_url, company_type, category, employee_size, headquarters_address, operating_countries")
        .order("name");
      if (error) throw error;
      return (data || []) as Company[];
    },
  });

  // Extract unique filter options from data
  const filterOptions = {
    types: [...new Set(companies.map((c) => c.company_type).filter(Boolean))] as string[],
    categories: [...new Set(companies.map((c) => c.category).filter(Boolean))] as string[],
    sizes: [...new Set(companies.map((c) => c.employee_size).filter(Boolean))] as string[],
  };

  // Filter companies
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      !search ||
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.category?.toLowerCase().includes(search.toLowerCase());
    const matchesType = !selectedType || company.company_type === selectedType;
    const matchesCategory = !selectedCategory || company.category === selectedCategory;
    const matchesSize = !selectedSize || company.employee_size === selectedSize;

    return matchesSearch && matchesType && matchesCategory && matchesSize;
  });

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setSelectedSize(null);
    setSearch("");
  };

  const hasActiveFilters = selectedType || selectedCategory || selectedSize || search;

  return (
    <AppLayout>
      <div className="dcc-content">
        {/* Page header */}
        <div className="mb-6">
          <h1>Companies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse and explore company profiles
          </p>
        </div>

        {/* Search and filters */}
        <div className="dcc-card mb-6">
          {/* Search input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {/* Type filters */}
            {filterOptions.types.length > 0 && (
              <>
                <span className="text-xs text-muted-foreground self-center mr-1">Type:</span>
                {filterOptions.types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={cn(
                      "dcc-filter-chip",
                      selectedType === type && "bg-primary text-primary-foreground border-primary"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </>
            )}

            {/* Category filters */}
            {filterOptions.categories.length > 0 && (
              <>
                <span className="text-xs text-muted-foreground self-center ml-2 mr-1">Category:</span>
                {filterOptions.categories.slice(0, 5).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={cn(
                      "dcc-filter-chip",
                      selectedCategory === category && "bg-primary text-primary-foreground border-primary"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </>
            )}

            {/* Size filters */}
            {filterOptions.sizes.length > 0 && (
              <>
                <span className="text-xs text-muted-foreground self-center ml-2 mr-1">Size:</span>
                {filterOptions.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={cn(
                      "dcc-filter-chip",
                      selectedSize === size && "bg-primary text-primary-foreground border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </>
            )}

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="dcc-filter-chip text-destructive hover:text-destructive"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredCompanies.length} {filteredCompanies.length === 1 ? "company" : "companies"}
          </p>
        </div>

        {/* Companies grid */}
        {isLoading ? (
          <div className="dcc-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="dcc-card animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-secondary rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No companies found"
            description={hasActiveFilters ? "Try adjusting your filters" : "No companies have been added yet"}
          />
        ) : (
          <div className="dcc-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="dcc-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {company.company_type && (
                        <span className="dcc-badge dcc-badge-primary">
                          {company.company_type}
                        </span>
                      )}
                      {company.category && (
                        <span className="dcc-badge dcc-badge-default">
                          {company.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {company.employee_size && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3 shrink-0" />
                      <span>{company.employee_size}</span>
                    </div>
                  )}
                  {company.headquarters_address && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{company.headquarters_address}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
