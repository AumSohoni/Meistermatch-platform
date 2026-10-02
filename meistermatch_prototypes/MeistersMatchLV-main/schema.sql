-- MeisterMatchBot Database Schema

-- Enable PostGIS for location-based queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Profile Roles
CREATE TYPE user_role AS ENUM ('customer', 'worker', 'admin');

-- Job Status
CREATE TYPE job_status AS ENUM ('open', 'accepted', 'arrived', 'completed', 'cancelled', 'expired');

-- Urgency Levels
CREATE TYPE urgency_level AS ENUM ('emergency', 'today', '2-3-days', 'flexible');

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT PRIMARY KEY, -- Telegram ID
    username TEXT,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'customer',
    is_verified BOOLEAN DEFAULT FALSE,
    location GEOGRAPHY(POINT, 4326),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    availability_status BOOLEAN DEFAULT FALSE,
    experience_years INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Worker Skills Table
CREATE TABLE IF NOT EXISTS worker_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id BIGINT REFERENCES profiles(id) ON DELETE CASCADE,
    skill TEXT NOT NULL,
    UNIQUE(worker_id, skill)
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id BIGINT REFERENCES profiles(id) ON DELETE CASCADE,
    worker_id BIGINT REFERENCES profiles(id) ON DELETE SET NULL,
    customer_name TEXT,
    customer_phone TEXT,
    customer_whatsapp TEXT,
    customer_telegram TEXT,
    customer_email TEXT,
    preferred_time TEXT,
    category TEXT NOT NULL,
    urgency urgency_level DEFAULT 'today',
    description TEXT,
    location GEOGRAPHY(POINT, 4326),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    address TEXT,
    photo_url TEXT,
    status job_status DEFAULT 'open',
    commission_rate DECIMAL DEFAULT 0.20,
    amount DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ratings Table
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    customer_id BIGINT REFERENCES profiles(id),
    worker_id BIGINT REFERENCES profiles(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RPC for finding closest workers
CREATE OR REPLACE FUNCTION get_nearby_workers(
    service_category TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    radius_meters DOUBLE PRECISION DEFAULT 10000
)
RETURNS TABLE (
    id BIGINT,
    full_name TEXT,
    distance DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.full_name,
        ST_Distance(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) AS distance
    FROM 
        profiles p
    JOIN 
        worker_skills ws ON p.id = ws.worker_id
    WHERE 
        p.role = 'worker' 
        AND p.is_verified = TRUE 
        AND p.availability_status = TRUE
        AND ws.skill = service_category
        AND ST_DWithin(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography, radius_meters)
    ORDER BY 
        distance ASC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql;
