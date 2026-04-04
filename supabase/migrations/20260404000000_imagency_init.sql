-- Characters table (the 10 real seed chars + future registrants)
CREATE TABLE characters (
  id TEXT PRIMARY KEY,              -- IMA-S001, etc.
  name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_initial CHAR(1) NOT NULL,
  age_range TEXT NOT NULL,
  gender TEXT NOT NULL,
  ethnicity TEXT,
  archetype TEXT NOT NULL,
  personality TEXT,
  voice_description TEXT,
  elevenlabs_voice_id TEXT,
  suggested_roles TEXT[] DEFAULT '{}',
  genre_fit TEXT[] DEFAULT '{}',
  available_uses TEXT[] DEFAULT '{}',  -- derived: Advertising, Film & TV, Streaming, Gaming, AI Training
  base_license_fee INTEGER DEFAULT 300,
  image_neutral_url TEXT,
  image_smile_url TEXT,
  image_serious_url TEXT,
  image_three_quarter_url TEXT,
  image_profile_url TEXT,
  voice_sample_url TEXT,
  license_available BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active',       -- active | suspended | archived
  total_earnings INTEGER DEFAULT 0,
  total_licenses INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  generated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Licenses table
CREATE TABLE licenses (
  id TEXT PRIMARY KEY,             -- LIC-XXXX
  character_id TEXT NOT NULL REFERENCES characters(id),
  buyer_id TEXT,
  buyer_email TEXT,
  license_type TEXT NOT NULL,      -- one-time | subscription | royalty
  use_category TEXT NOT NULL,      -- advertising | film_tv | streaming | gaming | ai_training
  media_types TEXT[] DEFAULT '{}',
  geography TEXT NOT NULL,
  duration TEXT NOT NULL,
  volume INTEGER DEFAULT 1,
  price INTEGER NOT NULL,
  creator_payout INTEGER NOT NULL,
  platform_fee INTEGER NOT NULL,
  status TEXT DEFAULT 'active',       -- escrow | active | expired | cancelled
  api_key TEXT,
  api_calls_used INTEGER DEFAULT 0,
  api_calls_limit INTEGER DEFAULT 0,
  escrow_releases_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- License usage events (API call tracking)
CREATE TABLE license_usage_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  license_id TEXT NOT NULL REFERENCES licenses(id),
  character_id TEXT NOT NULL REFERENCES characters(id),
  event_type TEXT NOT NULL,        -- api_render | download | preview | view
  buyer_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin activity log
CREATE TABLE admin_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id TEXT NOT NULL,
  action TEXT NOT NULL,            -- character_viewed | character_suspended | license_cancelled | stats_pulled
  target_type TEXT,                -- character | license | user
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_licenses_character_id ON licenses(character_id);
CREATE INDEX idx_licenses_status ON licenses(status);
CREATE INDEX idx_usage_events_license_id ON license_usage_events(license_id);
CREATE INDEX idx_usage_events_character_id ON license_usage_events(character_id);
CREATE INDEX idx_admin_log_created_at ON admin_activity_log(created_at DESC);

-- Helper: atomically increment total_licenses on a character
CREATE OR REPLACE FUNCTION increment_character_total_licenses(char_id TEXT)
RETURNS VOID AS $$
  UPDATE characters SET total_licenses = total_licenses + 1 WHERE id = char_id;
$$ LANGUAGE SQL SECURITY DEFINER;
