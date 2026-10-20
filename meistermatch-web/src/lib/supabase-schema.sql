-- ==============================================================================
-- MeisterMatch Platform — Full Supabase Schema & Migration
-- Compliant with RTU Bachelor Thesis Specification & Next.js Web Platform
-- ==============================================================================

-- 1. Enable PostGIS extension for geo-spatial distance ranking if available
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('client', 'worker', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status AS ENUM ('open', 'matched', 'in_progress', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE swipe_direction AS ENUM ('like', 'dislike');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Tradespeople and Clients)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    name TEXT NOT NULL,
    role user_role DEFAULT 'client',
    trade TEXT,
    district TEXT DEFAULT 'Centrs',
    city TEXT DEFAULT 'Riga',
    hourly_rate NUMERIC DEFAULT 25.00,
    experience_years INTEGER DEFAULT 3,
    availability TEXT DEFAULT 'Available Tomorrow',
    rating NUMERIC DEFAULT 4.8,
    reviews_count INTEGER DEFAULT 12,
    badge TEXT DEFAULT 'Vetted Meister',
    verified BOOLEAN DEFAULT TRUE,
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    phone TEXT,
    avatar_url TEXT,
    location GEOGRAPHY(POINT, 4326),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. JOBS / VACANCIES TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    title TEXT NOT NULL,
    trade TEXT NOT NULL,
    district TEXT NOT NULL DEFAULT 'Centrs',
    rate_range TEXT NOT NULL DEFAULT '€25 - €32 / hr',
    duration TEXT NOT NULL DEFAULT '2 weeks',
    urgency TEXT NOT NULL DEFAULT 'Urgent',
    description TEXT,
    required_skills TEXT[] DEFAULT '{}',
    trial_shift_available BOOLEAN DEFAULT TRUE,
    status job_status DEFAULT 'open',
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SWIPES TABLE (Reciprocal Matching Engine)
CREATE TABLE IF NOT EXISTS public.swipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT NOT NULL,           -- User or Meister doing the swipe
    target_id TEXT NOT NULL,          -- Profile or Job being swiped
    direction swipe_direction NOT NULL,
    match_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(actor_id, target_id)
);

-- 6. MATCHES TABLE
CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id TEXT NOT NULL,
    worker_id TEXT NOT NULL,
    job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'active',
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    trial_shift_agreed BOOLEAN DEFAULT FALSE,
    trial_shift_time TIMESTAMP WITH TIME ZONE,
    UNIQUE(client_id, worker_id)
);

-- 7. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    recipient_id TEXT NOT NULL,
    content TEXT NOT NULL,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Enable Row Level Security (RLS) with permissive public policies for development
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Permissive development policies (can be tightened before production launch)
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public write profiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Public read jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public write jobs" ON public.jobs FOR ALL USING (true);

CREATE POLICY "Public read swipes" ON public.swipes FOR SELECT USING (true);
CREATE POLICY "Public write swipes" ON public.swipes FOR ALL USING (true);

CREATE POLICY "Public read matches" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Public write matches" ON public.matches FOR ALL USING (true);

CREATE POLICY "Public read messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Public write messages" ON public.messages FOR ALL USING (true);

-- 9. Seed Initial Data for Riga Meister Ecosystem
INSERT INTO public.jobs (company_name, title, trade, district, rate_range, duration, urgency, description, required_skills, trial_shift_available)
VALUES 
('Baltic Build SIA', 'Master Electrician for Old Town Renovation', 'Electrician', 'Vecrīga', '€26 - €32 / hr', '3-4 weeks', 'Emergency Start', 'Historic residential building rewiring conforming to AS Sadales Tīkls standards. Sub-panel upgrade and concealed conduit installation.', ARRAY['Panel wiring', 'Sadales Tīkls', 'Three-phase', 'Fault diagnosis'], true),
('Rīgas Siltums Partneris', 'Certified Heating & PEX Plumber', 'Plumber', 'Centrs', '€24 - €30 / hr', '2 weeks', 'Starts Monday', 'Full radiator replacements and floor heating manifold installation in modern apartments. Pressure testing and certification needed.', ARRAY['PEX crimping', 'Floor heating', 'Manifold install', 'Radiator swap'], true),
('Nordic Craft Restorations', 'Fine Joiner & Heritage Woodworker', 'Carpenter', 'Pārdaugava', '€22 - €28 / hr', '1 month', 'Next Week', 'Restoration of 19th-century oak double windows and interior staircases in wooden architecture conservation zone.', ARRAY['Heritage restoration', 'Oak milling', 'Tenon joinery', 'Sash repair'], true),
('Latvija Flīžu Meistars', 'Large Format Porcelain Tiler', 'Tiler', 'Teika', '€25 - €35 / m²', '10 days', 'Ready Now', '120x60cm rectified porcelain tiles on prepared anhydrite screeds. 45-degree miter cuts for niche corners.', ARRAY['Large format', 'Miter cuts', 'Waterproofing', 'Epoxy grout'], true)
ON CONFLICT DO NOTHING;
