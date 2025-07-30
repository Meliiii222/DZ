
-- Create user roles enum and table for proper role management
CREATE TYPE public.app_role AS ENUM ('admin', 'juriste', 'citoyen');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by UUID REFERENCES auth.users(id),
    UNIQUE (user_id, role)
);

-- Security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = auth.uid()
  ORDER BY assigned_at DESC
  LIMIT 1;
$$;

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create audit log table for security tracking
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create file storage table for document management
CREATE TABLE public.file_storage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
    related_table TEXT,
    related_id UUID,
    is_public BOOLEAN DEFAULT FALSE,
    virus_scan_status TEXT DEFAULT 'pending' CHECK (virus_scan_status IN ('pending', 'clean', 'infected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on file_storage
ALTER TABLE public.file_storage ENABLE ROW LEVEL SECURITY;

-- File storage policies
CREATE POLICY "Users can view public files" ON public.file_storage
FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Users can view their own files" ON public.file_storage
FOR SELECT USING (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can upload files" ON public.file_storage
FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own files" ON public.file_storage
FOR UPDATE USING (auth.uid() = uploaded_by);

-- Add updated_at trigger to file_storage
CREATE TRIGGER update_file_storage_updated_at
BEFORE UPDATE ON public.file_storage
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create security incidents table
CREATE TABLE public.security_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    ip_address INET,
    user_agent TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'false_positive')),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on security_incidents
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;

-- Only admins can manage security incidents
CREATE POLICY "Admins can manage security incidents" ON public.security_incidents
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add constraints to existing tables for better data validation
ALTER TABLE public.legal_texts 
ADD CONSTRAINT legal_texts_title_length_check CHECK (char_length(title) >= 5),
ADD CONSTRAINT legal_texts_content_length_check CHECK (char_length(content) >= 50);

ALTER TABLE public.administrative_procedures
ADD CONSTRAINT procedures_title_length_check CHECK (char_length(title) >= 5),
ADD CONSTRAINT procedures_description_length_check CHECK (char_length(description) >= 10);

-- Update profiles table to be non-nullable for user_id (security requirement)
ALTER TABLE public.profiles ALTER COLUMN id SET NOT NULL;

-- Create function to automatically assign default role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Assign default 'citoyen' role to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'citoyen');
  RETURN NEW;
END;
$$;

-- Create trigger to assign role after user creation
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_legal_texts_search ON public.legal_texts USING GIN (
  to_tsvector('french', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(content, ''))
);

CREATE INDEX IF NOT EXISTS idx_procedures_search ON public.administrative_procedures USING GIN (
  to_tsvector('french', title || ' ' || COALESCE(description, ''))
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs (created_at);
CREATE INDEX IF NOT EXISTS idx_file_storage_uploaded_by ON public.file_storage (uploaded_by);
CREATE INDEX IF NOT EXISTS idx_security_incidents_created_at ON public.security_incidents (created_at);
