import { neon } from '@neondatabase/serverless';
import { env } from '../config/env';

export async function migrateAndSeedDatabase(): Promise<void> {
  const sql = neon(env.DATABASE_URL);

  try {
    // 1. Create Enums
    await sql`
      DO $$ BEGIN
        CREATE TYPE restaurant_type AS ENUM ('fine_dining_bistro', 'artisan_pizzeria');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE TYPE table_shape AS ENUM ('circular', 'rectangular', 'booth', 'counter');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE TYPE wine_body AS ENUM ('light', 'medium', 'full');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `;
    await sql`
      DO $$ BEGIN
        CREATE TYPE wine_type AS ENUM ('red', 'white', 'rose', 'sparkling', 'orange', 'digestif', 'non_alcoholic');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `;

    // 2. Create Tables
    await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR(64) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        type restaurant_type NOT NULL,
        headline VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        currency VARCHAR(3) DEFAULT 'EUR' NOT NULL,
        address_street VARCHAR(255) NOT NULL,
        address_city VARCHAR(128) NOT NULL,
        address_postal_code VARCHAR(32) NOT NULL,
        address_country VARCHAR(64) NOT NULL,
        phone VARCHAR(32) NOT NULL,
        email VARCHAR(128) NOT NULL,
        whatsapp_number VARCHAR(32),
        google_maps_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS zones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
        slug VARCHAR(64) NOT NULL,
        name VARCHAR(128) NOT NULL,
        description TEXT,
        ambient_notes VARCHAR(255),
        display_order INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS tables (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
        table_number VARCHAR(16) NOT NULL,
        min_capacity INTEGER NOT NULL,
        max_capacity INTEGER NOT NULL,
        shape table_shape DEFAULT 'rectangular' NOT NULL,
        svg_x_coord NUMERIC(6, 2) NOT NULL,
        svg_y_coord NUMERIC(6, 2) NOT NULL,
        svg_width NUMERIC(6, 2) NOT NULL,
        svg_height NUMERIC(6, 2) NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS menu_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
        slug VARCHAR(64) NOT NULL,
        name_en VARCHAR(128) NOT NULL,
        name_local VARCHAR(128) NOT NULL,
        display_order INTEGER DEFAULT 0 NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS menu_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
        title_en VARCHAR(255) NOT NULL,
        title_local VARCHAR(255) NOT NULL,
        description_en TEXT NOT NULL,
        description_local TEXT,
        price_cents INTEGER NOT NULL,
        is_signature BOOLEAN DEFAULT false NOT NULL,
        is_seasonal BOOLEAN DEFAULT false NOT NULL,
        is_vegan BOOLEAN DEFAULT false NOT NULL,
        is_vegetarian BOOLEAN DEFAULT false NOT NULL,
        is_gluten_free BOOLEAN DEFAULT false NOT NULL,
        is_dairy_free BOOLEAN DEFAULT false NOT NULL,
        is_halal BOOLEAN DEFAULT false NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS wines (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        producer VARCHAR(255) NOT NULL,
        vintage INTEGER,
        region VARCHAR(128) NOT NULL,
        country VARCHAR(64) NOT NULL,
        type wine_type NOT NULL,
        body wine_body NOT NULL,
        grape_varietals VARCHAR(255) NOT NULL,
        serving_temp_celsius INTEGER,
        glass_price_cents INTEGER,
        bottle_price_cents INTEGER NOT NULL,
        tasting_notes TEXT NOT NULL,
        acidity_score INTEGER NOT NULL,
        tannin_score INTEGER NOT NULL,
        body_score INTEGER NOT NULL,
        oak_score INTEGER NOT NULL,
        intensity_score INTEGER NOT NULL,
        is_organic_biodynamic BOOLEAN DEFAULT false NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS wine_pairings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
        wine_id UUID NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
        pairing_type VARCHAR(32) DEFAULT 'classic' NOT NULL,
        pairing_notes TEXT NOT NULL,
        display_priority INTEGER DEFAULT 1 NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS reservations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        confirmation_code VARCHAR(16) UNIQUE NOT NULL,
        restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
        table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
        seating_zone VARCHAR(32) NOT NULL DEFAULT 'terrace',
        guest_name VARCHAR(128) NOT NULL,
        guest_email VARCHAR(128) NOT NULL,
        guest_phone VARCHAR(32) NOT NULL,
        party_size INTEGER NOT NULL,
        reservation_date DATE NOT NULL,
        reservation_time TIME NOT NULL,
        status reservation_status DEFAULT 'confirmed' NOT NULL,
        dietary_notes TEXT,
        special_requests TEXT,
        gdpr_consent_timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS gdpr_consents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(128) NOT NULL,
        ip_hash VARCHAR(64) NOT NULL,
        necessary_accepted BOOLEAN DEFAULT true NOT NULL,
        analytics_accepted BOOLEAN DEFAULT false NOT NULL,
        marketing_accepted BOOLEAN DEFAULT false NOT NULL,
        consent_version VARCHAR(16) DEFAULT '2.0' NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(128) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(32) DEFAULT 'manager' NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
    `;

    // 3. Seed Restaurants if not present
    await sql`
      INSERT INTO restaurants (
        id, slug, name, type, headline, description, currency,
        address_street, address_city, address_postal_code, address_country,
        phone, email, whatsapp_number, google_maps_url
      ) VALUES
      (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'letoile-terroir',
        'L''Étoile & Terroir',
        'fine_dining_bistro',
        'Haute Gastronomie Française • Michelin Guide Inspection',
        'From the wild Atlantic currents of Brittany to the ancient oak forests of Périgord, our culinary manifesto celebrates biodynamic French agriculture, heirloom produce, and timeless classical technique.',
        'EUR',
        '14 Rue Saint-Honoré',
        'Paris',
        '75001',
        'France',
        '+33 1 42 68 55 00',
        'reservations@letoile-terroir.fr',
        '+33612345678',
        'https://maps.google.com/?q=14+Rue+Saint-Honore+Paris'
      ),
      (
        'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        'lievito-madre',
        'Lievito Madre',
        'artisan_pizzeria',
        '48 Ore di Fermentazione Naturale • Stefano Ferrara Forno 450°C',
        'Every pizza begins with our hundred-year-old sourdough starter, organic stone-milled Campania grains, and 85% hydration dough proofed for 48 hours to ensure airy digestibility and unmistakable leopard-blistered crust.',
        'EUR',
        'Via dei Tribunali 32',
        'Naples',
        '80138',
        'Italy',
        '+39 081 555 0192',
        'prenotazioni@lievitomadre-artisan.it',
        '+393456789012',
        'https://maps.google.com/?q=Via+dei+Tribunali+32+Naples'
      )
      ON CONFLICT (slug) DO NOTHING;
    `;

    console.log('[Neon PostgreSQL] Schema migrated and seed baseline verified.');
  } catch (error) {
    console.error('[Neon PostgreSQL Migration Error]:', error);
  }
}
