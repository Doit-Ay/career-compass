export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          category: string | null
          company_type: string | null
          created_at: string
          description: string | null
          employee_size: string | null
          founded_year: number | null
          headquarters_address: string | null
          id: string
          logo_url: string | null
          name: string
          operating_countries: string[] | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          category?: string | null
          company_type?: string | null
          created_at?: string
          description?: string | null
          employee_size?: string | null
          founded_year?: number | null
          headquarters_address?: string | null
          id?: string
          logo_url?: string | null
          name: string
          operating_countries?: string[] | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          category?: string | null
          company_type?: string | null
          created_at?: string
          description?: string | null
          employee_size?: string | null
          founded_year?: number | null
          headquarters_address?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          operating_countries?: string[] | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      company_brand_reputation: {
        Row: {
          brand_recognition: string | null
          company_id: string
          created_at: string
          employer_brand_rating: string | null
          id: string
          industry_awards: string[] | null
          media_mentions: string[] | null
          social_media_presence: string | null
        }
        Insert: {
          brand_recognition?: string | null
          company_id: string
          created_at?: string
          employer_brand_rating?: string | null
          id?: string
          industry_awards?: string[] | null
          media_mentions?: string[] | null
          social_media_presence?: string | null
        }
        Update: {
          brand_recognition?: string | null
          company_id?: string
          created_at?: string
          employer_brand_rating?: string | null
          id?: string
          industry_awards?: string[] | null
          media_mentions?: string[] | null
          social_media_presence?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_brand_reputation_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_business: {
        Row: {
          business_model: string | null
          company_id: string
          competitive_advantage: string | null
          created_at: string
          growth_strategy: string | null
          id: string
          revenue_streams: string[] | null
          strategic_partnerships: string[] | null
          target_markets: string[] | null
        }
        Insert: {
          business_model?: string | null
          company_id: string
          competitive_advantage?: string | null
          created_at?: string
          growth_strategy?: string | null
          id?: string
          revenue_streams?: string[] | null
          strategic_partnerships?: string[] | null
          target_markets?: string[] | null
        }
        Update: {
          business_model?: string | null
          company_id?: string
          competitive_advantage?: string | null
          created_at?: string
          growth_strategy?: string | null
          id?: string
          revenue_streams?: string[] | null
          strategic_partnerships?: string[] | null
          target_markets?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "company_business_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_compensation: {
        Row: {
          benefits: string[] | null
          bonus_structure: string | null
          company_id: string
          created_at: string
          equity_options: boolean | null
          id: string
          pay_frequency: string | null
          salary_range_max: number | null
          salary_range_min: number | null
        }
        Insert: {
          benefits?: string[] | null
          bonus_structure?: string | null
          company_id: string
          created_at?: string
          equity_options?: boolean | null
          id?: string
          pay_frequency?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
        }
        Update: {
          benefits?: string[] | null
          bonus_structure?: string | null
          company_id?: string
          created_at?: string
          equity_options?: boolean | null
          id?: string
          pay_frequency?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_compensation_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_culture: {
        Row: {
          company_id: string
          core_values: string[] | null
          created_at: string
          diversity_initiatives: string[] | null
          dress_code: string | null
          id: string
          remote_policy: string | null
          team_activities: string[] | null
          work_environment: string | null
          work_life_balance: string | null
        }
        Insert: {
          company_id: string
          core_values?: string[] | null
          created_at?: string
          diversity_initiatives?: string[] | null
          dress_code?: string | null
          id?: string
          remote_policy?: string | null
          team_activities?: string[] | null
          work_environment?: string | null
          work_life_balance?: string | null
        }
        Update: {
          company_id?: string
          core_values?: string[] | null
          created_at?: string
          diversity_initiatives?: string[] | null
          dress_code?: string | null
          id?: string
          remote_policy?: string | null
          team_activities?: string[] | null
          work_environment?: string | null
          work_life_balance?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_culture_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_financials: {
        Row: {
          annual_revenue: string | null
          company_id: string
          created_at: string
          fiscal_year_end: string | null
          funding_stage: string | null
          id: string
          profitability_status: string | null
          public_or_private: string | null
          stock_symbol: string | null
          total_funding: string | null
        }
        Insert: {
          annual_revenue?: string | null
          company_id: string
          created_at?: string
          fiscal_year_end?: string | null
          funding_stage?: string | null
          id?: string
          profitability_status?: string | null
          public_or_private?: string | null
          stock_symbol?: string | null
          total_funding?: string | null
        }
        Update: {
          annual_revenue?: string | null
          company_id?: string
          created_at?: string
          fiscal_year_end?: string | null
          funding_stage?: string | null
          id?: string
          profitability_status?: string | null
          public_or_private?: string | null
          stock_symbol?: string | null
          total_funding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_financials_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_logistics: {
        Row: {
          company_id: string
          created_at: string
          id: string
          office_locations: string[] | null
          relocation_support: boolean | null
          timezone: string | null
          travel_requirements: string | null
          visa_sponsorship: boolean | null
          work_hours: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          office_locations?: string[] | null
          relocation_support?: boolean | null
          timezone?: string | null
          travel_requirements?: string | null
          visa_sponsorship?: boolean | null
          work_hours?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          office_locations?: string[] | null
          relocation_support?: boolean | null
          timezone?: string | null
          travel_requirements?: string | null
          visa_sponsorship?: boolean | null
          work_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_logistics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_people: {
        Row: {
          attrition_rate: string | null
          average_tenure: string | null
          ceo_name: string | null
          company_id: string
          created_at: string
          employee_count: number | null
          hiring_rate: string | null
          id: string
          leadership_team: string[] | null
        }
        Insert: {
          attrition_rate?: string | null
          average_tenure?: string | null
          ceo_name?: string | null
          company_id: string
          created_at?: string
          employee_count?: number | null
          hiring_rate?: string | null
          id?: string
          leadership_team?: string[] | null
        }
        Update: {
          attrition_rate?: string | null
          average_tenure?: string | null
          ceo_name?: string | null
          company_id?: string
          created_at?: string
          employee_count?: number | null
          hiring_rate?: string | null
          id?: string
          leadership_team?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "company_people_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_talent_growth: {
        Row: {
          career_paths: string[] | null
          certification_support: boolean | null
          company_id: string
          created_at: string
          id: string
          learning_budget: string | null
          mentorship_available: boolean | null
          promotion_frequency: string | null
          training_programs: string[] | null
        }
        Insert: {
          career_paths?: string[] | null
          certification_support?: boolean | null
          company_id: string
          created_at?: string
          id?: string
          learning_budget?: string | null
          mentorship_available?: boolean | null
          promotion_frequency?: string | null
          training_programs?: string[] | null
        }
        Update: {
          career_paths?: string[] | null
          certification_support?: boolean | null
          company_id?: string
          created_at?: string
          id?: string
          learning_budget?: string | null
          mentorship_available?: boolean | null
          promotion_frequency?: string | null
          training_programs?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "company_talent_growth_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_technologies: {
        Row: {
          cloud_providers: string[] | null
          company_id: string
          created_at: string
          development_methodology: string | null
          engineering_practices: string[] | null
          id: string
          innovation_focus: string[] | null
          tech_stack: string[] | null
        }
        Insert: {
          cloud_providers?: string[] | null
          company_id: string
          created_at?: string
          development_methodology?: string | null
          engineering_practices?: string[] | null
          id?: string
          innovation_focus?: string[] | null
          tech_stack?: string[] | null
        }
        Update: {
          cloud_providers?: string[] | null
          company_id?: string
          created_at?: string
          development_methodology?: string | null
          engineering_practices?: string[] | null
          id?: string
          innovation_focus?: string[] | null
          tech_stack?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "company_technologies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
