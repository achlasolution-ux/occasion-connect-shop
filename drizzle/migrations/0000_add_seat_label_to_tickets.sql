ALTER TABLE public.tickets ADD COLUMN IF NOT EXISTS seat_label text;
ALTER TABLE public.tickets ADD COLUMN IF NOT EXISTS section_name text;