# Supabase SQL Setup

This document contains the SQL queries needed to set up the database schema for the portfolio web vitals monitoring dashboard.

## Table Schema

### `web_vitals` Table

This table stores Core Web Vitals metrics collected from the live website.

```sql
-- Create web_vitals table
CREATE TABLE IF NOT EXISTS public.web_vitals (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL CHECK (name IN ('CLS', 'FCP', 'LCP', 'TTFB', 'INP')),
  value FLOAT8 NOT NULL,
  delta FLOAT8 NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('good', 'needs-improvement', 'poor')),
  navigation_type TEXT
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_web_vitals_created_at
  ON public.web_vitals (created_at DESC);

-- Create index on name for faster filtering by metric type
CREATE INDEX IF NOT EXISTS idx_web_vitals_name
  ON public.web_vitals (name);

-- Create composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_web_vitals_name_created_at
  ON public.web_vitals (name, created_at DESC);
```

## Row Level Security (RLS)

Enable RLS and set up policies for secure access:

```sql
-- Enable Row Level Security
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for web-vitals collection)
CREATE POLICY "Allow anonymous inserts"
  ON public.web_vitals
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anonymous reads (for dashboard)
CREATE POLICY "Allow anonymous reads"
  ON public.web_vitals
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Allow service role full access
CREATE POLICY "Allow service role full access"
  ON public.web_vitals
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

## Useful Queries

### Get Latest Metrics by Type

```sql
-- Get the most recent value for each metric type
SELECT DISTINCT ON (name)
  name,
  value,
  rating,
  created_at,
  delta,
  navigation_type
FROM public.web_vitals
ORDER BY name, created_at DESC;
```

### Get All Metrics Ordered by Time

```sql
-- Get all metrics sorted by creation time (newest first)
SELECT
  name,
  value,
  rating,
  created_at,
  delta,
  navigation_type
FROM public.web_vitals
ORDER BY created_at DESC;
```

### Get Metrics for Last 24 Hours

```sql
-- Get metrics from the last 24 hours
SELECT
  name,
  value,
  rating,
  created_at
FROM public.web_vitals
WHERE created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Get Average Values by Metric Type

```sql
-- Calculate average values for each metric type
SELECT
  name,
  ROUND(AVG(value)::numeric, 2) as avg_value,
  COUNT(*) as sample_count,
  MODE() WITHIN GROUP (ORDER BY rating) as most_common_rating
FROM public.web_vitals
GROUP BY name
ORDER BY name;
```

### Get Rating Distribution

```sql
-- Count metrics by rating for each type
SELECT
  name,
  rating,
  COUNT(*) as count,
  ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY name))::numeric, 2) as percentage
FROM public.web_vitals
GROUP BY name, rating
ORDER BY name, rating;
```

### Get Metrics by Date Range

```sql
-- Get metrics within a specific date range
SELECT
  name,
  value,
  rating,
  created_at
FROM public.web_vitals
WHERE created_at BETWEEN '2025-01-01' AND '2025-12-31'
ORDER BY created_at DESC;
```

### Clean Up Old Data

```sql
-- Delete metrics older than 30 days (run periodically)
DELETE FROM public.web_vitals
WHERE created_at < NOW() - INTERVAL '30 days';
```

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | BIGSERIAL | Auto-incrementing primary key |
| `created_at` | TIMESTAMPTZ | Timestamp when the metric was recorded (UTC) |
| `name` | TEXT | Metric type: CLS, FCP, LCP, TTFB, or INP |
| `value` | FLOAT8 | Metric value in milliseconds (or unitless for CLS) |
| `delta` | FLOAT8 | Change in metric value since last measurement |
| `rating` | TEXT | Performance rating: 'good', 'needs-improvement', or 'poor' |
| `navigation_type` | TEXT | Navigation type from web-vitals library |

## Metric Value Ranges

Based on [Web Vitals thresholds](https://web.dev/articles/vitals):

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **CLS** | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **FCP** | ≤ 1800ms | 1800 - 3000ms | > 3000ms |
| **LCP** | ≤ 2500ms | 2500 - 4000ms | > 4000ms |
| **TTFB** | ≤ 800ms | 800 - 1800ms | > 1800ms |
| **INP** | ≤ 200ms | 200 - 500ms | > 500ms |

## Environment Variables

Make sure to set these in your Vercel project:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (for server-side access)

For local development, add to `.env`:

- `VITE_ENV=local`
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Anonymous public key

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the table schema SQL above
5. Run the query
6. Copy and paste the RLS policies SQL
7. Run the query
8. Verify the table exists in **Table Editor**
9. Test by inserting a sample row:

```sql
INSERT INTO public.web_vitals (name, value, delta, rating, navigation_type)
VALUES ('LCP', 1234.5, 100.0, 'good', 'navigate');
```

10. Verify the data appears in the dashboard at `/dashboard`
