export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      administrative_procedures: {
        Row: {
          category: string
          completed_count: number | null
          cost: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty: string | null
          duration: string | null
          forms: Json | null
          id: string
          institution: string
          rating: number | null
          required_documents: string[] | null
          status: string | null
          steps: Json | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          completed_count?: number | null
          cost?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          forms?: Json | null
          id?: string
          institution: string
          rating?: number | null
          required_documents?: string[] | null
          status?: string | null
          steps?: Json | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          completed_count?: number | null
          cost?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          forms?: Json | null
          id?: string
          institution?: string
          rating?: number | null
          required_documents?: string[] | null
          status?: string | null
          steps?: Json | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      approval_queue: {
        Row: {
          id: string
          item_id: string
          item_type: string
          reviewed_at: string | null
          reviewer_comments: string | null
          reviewer_id: string | null
          status: string | null
          submitted_at: string | null
          submitted_by: string | null
        }
        Insert: {
          id?: string
          item_id: string
          item_type: string
          reviewed_at?: string | null
          reviewer_comments?: string | null
          reviewer_id?: string | null
          status?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          item_type?: string
          reviewed_at?: string | null
          reviewer_comments?: string | null
          reviewer_id?: string | null
          status?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      file_storage: {
        Row: {
          created_at: string | null
          file_path: string
          file_size: number
          filename: string
          id: string
          is_public: boolean | null
          mime_type: string
          original_filename: string
          related_id: string | null
          related_table: string | null
          updated_at: string | null
          uploaded_by: string
          virus_scan_status: string | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_size: number
          filename: string
          id?: string
          is_public?: boolean | null
          mime_type: string
          original_filename: string
          related_id?: string | null
          related_table?: string | null
          updated_at?: string | null
          uploaded_by: string
          virus_scan_status?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          is_public?: boolean | null
          mime_type?: string
          original_filename?: string
          related_id?: string | null
          related_table?: string | null
          updated_at?: string | null
          uploaded_by?: string
          virus_scan_status?: string | null
        }
        Relationships: []
      }
      legal_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          order_index: number | null
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          order_index?: number | null
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          order_index?: number | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "legal_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_text_versions: {
        Row: {
          changes_summary: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          id: string
          legal_text_id: string | null
          version_number: number
        }
        Insert: {
          changes_summary?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          legal_text_id?: string | null
          version_number: number
        }
        Update: {
          changes_summary?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          legal_text_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "legal_text_versions_legal_text_id_fkey"
            columns: ["legal_text_id"]
            isOneToOne: false
            referencedRelation: "legal_texts"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_texts: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          institution: string | null
          journal_date: string | null
          journal_number: string | null
          page_number: string | null
          sector: string | null
          status: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          institution?: string | null
          journal_date?: string | null
          journal_number?: string | null
          page_number?: string | null
          sector?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          institution?: string | null
          journal_date?: string | null
          journal_number?: string | null
          page_number?: string | null
          sector?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      procedure_documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_name: string
          document_type: string | null
          id: string
          is_required: boolean | null
          procedure_id: string | null
          template_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_name: string
          document_type?: string | null
          id?: string
          is_required?: boolean | null
          procedure_id?: string | null
          template_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_name?: string
          document_type?: string | null
          id?: string
          is_required?: boolean | null
          procedure_id?: string | null
          template_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "procedure_documents_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "administrative_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      procedure_steps: {
        Row: {
          created_at: string | null
          description: string | null
          duration_estimate: string | null
          id: string
          is_required: boolean | null
          procedure_id: string | null
          required_documents: string[] | null
          step_number: number
          tips: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_estimate?: string | null
          id?: string
          is_required?: boolean | null
          procedure_id?: string | null
          required_documents?: string[] | null
          step_number: number
          tips?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_estimate?: string | null
          id?: string
          is_required?: boolean | null
          procedure_id?: string | null
          required_documents?: string[] | null
          step_number?: number
          tips?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "procedure_steps_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "administrative_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          is_active: boolean | null
          language_preference: string | null
          last_name: string | null
          organization: string | null
          phone: string | null
          position: string | null
          preferences: Json | null
          role: string | null
          specializations: string[] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_active?: boolean | null
          language_preference?: string | null
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          role?: string | null
          specializations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          language_preference?: string | null
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          role?: string | null
          specializations?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      search_history: {
        Row: {
          created_at: string | null
          filters: Json | null
          id: string
          query: string
          results_count: number | null
          section: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          query: string
          results_count?: number | null
          section?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          filters?: Json | null
          id?: string
          query?: string
          results_count?: number | null
          section?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_incidents: {
        Row: {
          created_at: string | null
          description: string
          id: string
          incident_type: string
          ip_address: unknown | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          incident_type: string
          ip_address?: unknown | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          incident_type?: string
          ip_address?: unknown | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      text_annotations: {
        Row: {
          annotation_type: string | null
          content: string
          created_at: string | null
          id: string
          is_public: boolean | null
          legal_text_id: string | null
          position_end: number | null
          position_start: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          annotation_type?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          legal_text_id?: string | null
          position_end?: number | null
          position_start?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          annotation_type?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          legal_text_id?: string | null
          position_end?: number | null
          position_start?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "text_annotations_legal_text_id_fkey"
            columns: ["legal_text_id"]
            isOneToOne: false
            referencedRelation: "legal_texts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_procedure_progress: {
        Row: {
          completed_at: string | null
          current_step: number | null
          id: string
          notes: string | null
          procedure_id: string | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          current_step?: number | null
          id?: string
          notes?: string | null
          procedure_id?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          current_step?: number | null
          id?: string
          notes?: string | null
          procedure_id?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_procedure_progress_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "administrative_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          id: string
          last_activity: string | null
          session_data: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          session_data?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_activity?: string | null
          session_data?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "juriste" | "citoyen"
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
    Enums: {
      app_role: ["admin", "juriste", "citoyen"],
    },
  },
} as const
