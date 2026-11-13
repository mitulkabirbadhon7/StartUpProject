# Database Schema Specification (Neon Serverless PostgreSQL)

## Project: European Dining Web Demos (High-End Bistro & Artisan Pizzeria)
**Database Engine:** Neon Serverless PostgreSQL 16+  
**ORM:** Drizzle ORM (Type-safe, zero cold start overhead, edge compatible)  
**Schema Strictness:** Foreign keys, composite indexes, check constraints, enum types, and Zod runtime validation.

---

## 1. Entity Relationship (ER) Architecture

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   restaurants   │1─────*│      zones      │1─────*│     tables      │
└────────┬────────┘       └─────────────────┘       └────────┬────────┘
         │1                                                  │1
         │                                                   │
         │*                                                  │*
┌────────┴────────┐       ┌─────────────────┐       ┌────────┴────────┐
│ menu_categories │1─────*│   menu_items    │       │  reservations   │
└─────────────────┘       └────────┬────────┘       └─────────────────┘
                                   │1
                         ┌─────────┴─────────┐
                         │*                  │*
                ┌────────┴────────┐ ┌────────┴────────┐
                │  wine_pairings  │ │   allergens     │
                └────────┬────────┘ └─────────────────┘
                         │*
                ┌────────┴────────┐
                │      wines      │
                └─────────────────┘
```

---

## 2. PostgreSQL DDL (Data Definition Language)

```sql
-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE restaurant_type AS ENUM ('fine_dining_bistro', 'artisan_pizzeria');
CREATE TYPE table_shape AS ENUM ('circular', 'rectangular', 'booth', 'counter');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show');
CREATE TYPE wine_body AS ENUM ('light', 'medium', 'full');
CREATE TYPE wine_type AS ENUM ('red', 'white', 'rose', 'sparkling', 'orange', 'digestif', 'non_alcoholic');

-- 1. Restaurants Table
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    type restaurant_type NOT NULL,
    headline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR' NOT NULL, -- EUR, GBP, CHF
    address_street VARCHAR(255) NOT NULL,
    address_city VARCHAR(128) NOT NULL,
    address_postal_code VARCHAR(32) NOT NULL,
    address_country VARCHAR(64) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(128) NOT NULL,
    whatsapp_number VARCHAR(32),
    google_maps_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Restaurant Floorplan Zones
CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    slug VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL, -- e.g., 'Heated Garden Terrace', 'Main Dining Room', 'Sommelier Bar'
    description TEXT,
    ambient_notes VARCHAR(255), -- e.g., 'Intimate candlelight, acoustic jazz'
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(restaurant_id, slug)
);

-- 3. Tables & Seats
CREATE TABLE tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    table_number VARCHAR(16) NOT NULL,
    min_capacity INT NOT NULL CHECK (min_capacity > 0),
    max_capacity INT NOT NULL CHECK (max_capacity >= min_capacity),
    shape table_shape DEFAULT 'rectangular' NOT NULL,
    svg_x_coord NUMERIC(6, 2) NOT NULL,
    svg_y_coord NUMERIC(6, 2) NOT NULL,
    svg_width NUMERIC(6, 2) NOT NULL,
    svg_height NUMERIC(6, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(zone_id, table_number)
);

-- 4. Menu Categories
CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    slug VARCHAR(64) NOT NULL,
    name_en VARCHAR(128) NOT NULL,
    name_local VARCHAR(128) NOT NULL, -- French/Italian original title
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    UNIQUE(restaurant_id, slug)
);

-- 5. Menu Items
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_local VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_local TEXT,
    price_cents INT NOT NULL CHECK (price_cents >= 0),
    is_signature BOOLEAN DEFAULT FALSE NOT NULL,
    is_seasonal BOOLEAN DEFAULT FALSE NOT NULL,
    is_vegan BOOLEAN DEFAULT FALSE NOT NULL,
    is_vegetarian BOOLEAN DEFAULT FALSE NOT NULL,
    is_gluten_free BOOLEAN DEFAULT FALSE NOT NULL,
    is_dairy_free BOOLEAN DEFAULT FALSE NOT NULL,
    is_halal BOOLEAN DEFAULT FALSE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. EU-14 Allergens & Mappings
CREATE TABLE allergens (
    id VARCHAR(32) PRIMARY KEY, -- e.g., 'gluten', 'crustaceans', 'eggs', 'milk', 'nuts'
    name_en VARCHAR(64) NOT NULL,
    eu_code INT UNIQUE NOT NULL -- EU standard 1-14 code
);

CREATE TABLE menu_item_allergens (
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    allergen_id VARCHAR(32) NOT NULL REFERENCES allergens(id) ON DELETE CASCADE,
    PRIMARY KEY(menu_item_id, allergen_id)
);

-- 7. Wines & Sommelier Collection
CREATE TABLE wines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    producer VARCHAR(255) NOT NULL,
    vintage INT CHECK (vintage > 1900 AND vintage <= 2100),
    region VARCHAR(128) NOT NULL, -- e.g., 'Burgundy', 'Piedmont', 'Bordeaux'
    country VARCHAR(64) NOT NULL,
    type wine_type NOT NULL,
    body wine_body NOT NULL,
    grape_varietals VARCHAR(255) NOT NULL,
    serving_temp_celsius INT,
    glass_price_cents INT,
    bottle_price_cents INT NOT NULL,
    tasting_notes TEXT NOT NULL,
    -- Radar metrics (1 - 5)
    acidity_score INT CHECK (acidity_score BETWEEN 1 AND 5) NOT NULL,
    tannin_score INT CHECK (tannin_score BETWEEN 1 AND 5) NOT NULL,
    body_score INT CHECK (body_score BETWEEN 1 AND 5) NOT NULL,
    oak_score INT CHECK (oak_score BETWEEN 1 AND 5) NOT NULL,
    intensity_score INT CHECK (intensity_score BETWEEN 1 AND 5) NOT NULL,
    is_organic_biodynamic BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. Sommelier Pairing Bridge
CREATE TABLE wine_pairings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    wine_id UUID NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
    pairing_type VARCHAR(32) DEFAULT 'classic' NOT NULL, -- 'classic', 'adventurous', 'non_alcoholic'
    pairing_notes TEXT NOT NULL,
    display_priority INT DEFAULT 1 NOT NULL,
    UNIQUE(menu_item_id, wine_id)
);

-- 9. Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    confirmation_code VARCHAR(16) UNIQUE NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
    guest_name VARCHAR(128) NOT NULL,
    guest_email VARCHAR(128) NOT NULL,
    guest_phone VARCHAR(32) NOT NULL,
    party_size INT NOT NULL CHECK (party_size BETWEEN 1 AND 20),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    status reservation_status DEFAULT 'confirmed' NOT NULL,
    dietary_notes TEXT,
    special_requests TEXT,
    gdpr_consent_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_reservations_datetime ON reservations(restaurant_id, reservation_date, reservation_time);
CREATE INDEX idx_reservations_status ON reservations(status);

-- 10. GDPR & Compliance Audit Logs
CREATE TABLE gdpr_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(128) NOT NULL,
    ip_hash VARCHAR(64) NOT NULL, -- Anonymized SHA-256 hash (never raw IP)
    necessary_accepted BOOLEAN DEFAULT TRUE NOT NULL,
    analytics_accepted BOOLEAN DEFAULT FALSE NOT NULL,
    marketing_accepted BOOLEAN DEFAULT FALSE NOT NULL,
    consent_version VARCHAR(16) DEFAULT '2.0' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 3. Drizzle ORM Schema Definition (`backend/src/db/schema.ts`)

```typescript
import { pgTable, uuid, varchar, text, integer, boolean, numeric, timestamp, date, time, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const restaurantTypeEnum = pgEnum('restaurant_type', ['fine_dining_bistro', 'artisan_pizzeria']);
export const tableShapeEnum = pgEnum('table_shape', ['circular', 'rectangular', 'booth', 'counter']);
export const reservationStatusEnum = pgEnum('reservation_status', ['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show']);
export const wineBodyEnum = pgEnum('wine_body', ['light', 'medium', 'full']);
export const wineTypeEnum = pgEnum('wine_type', ['red', 'white', 'rose', 'sparkling', 'orange', 'digestif', 'non_alcoholic']);

export const restaurants = pgTable('restaurants', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 64 }).unique().notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  type: restaurantTypeEnum('type').notNull(),
  headline: varchar('headline', { length: 255 }).notNull(),
  description: text('description').notNull(),
  currency: varchar('currency', { length: 3 }).default('EUR').notNull(),
  addressStreet: varchar('address_street', { length: 255 }).notNull(),
  addressCity: varchar('address_city', { length: 128 }).notNull(),
  addressPostalCode: varchar('address_postal_code', { length: 32 }).notNull(),
  addressCountry: varchar('address_country', { length: 64 }).notNull(),
  phone: varchar('phone', { length: 32 }).notNull(),
  email: varchar('email', { length: 128 }).notNull(),
  whatsappNumber: varchar('whatsapp_number', { length: 32 }),
  googleMapsUrl: text('google_maps_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const zones = pgTable('zones', {
  id: uuid('id').primaryKey().defaultRandom(),
  restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 64 }).notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description'),
  ambientNotes: varchar('ambient_notes', { length: 255 }),
  displayOrder: integer('display_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const tables = pgTable('tables', {
  id: uuid('id').primaryKey().defaultRandom(),
  zoneId: uuid('zone_id').notNull().references(() => zones.id, { onDelete: 'cascade' }),
  tableNumber: varchar('table_number', { length: 16 }).notNull(),
  minCapacity: integer('min_capacity').notNull(),
  maxCapacity: integer('max_capacity').notNull(),
  shape: tableShapeEnum('shape').default('rectangular').notNull(),
  svgXCoord: numeric('svg_x_coord', { precision: 6, scale: 2 }).notNull(),
  svgYCoord: numeric('svg_y_coord', { precision: 6, scale: 2 }).notNull(),
  svgWidth: numeric('svg_width', { precision: 6, scale: 2 }).notNull(),
  svgHeight: numeric('svg_height', { precision: 6, scale: 2 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const menuCategories = pgTable('menu_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 64 }).notNull(),
  nameEn: varchar('name_en', { length: 128 }).notNull(),
  nameLocal: varchar('name_local', { length: 128 }).notNull(),
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const menuItems = pgTable('menu_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => menuCategories.id, { onDelete: 'cascade' }),
  titleEn: varchar('title_en', { length: 255 }).notNull(),
  titleLocal: varchar('title_local', { length: 255 }).notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionLocal: text('description_local'),
  priceCents: integer('price_cents').notNull(),
  isSignature: boolean('is_signature').default(false).notNull(),
  isSeasonal: boolean('is_seasonal').default(false).notNull(),
  isVegan: boolean('is_vegan').default(false).notNull(),
  isVegetarian: boolean('is_vegetarian').default(false).notNull(),
  isGlutenFree: boolean('is_gluten_free').default(false).notNull(),
  isDairyFree: boolean('is_dairy_free').default(false).notNull(),
  isHalal: boolean('is_halal').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const wines = pgTable('wines', {
  id: uuid('id').primaryKey().defaultRandom(),
  restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  producer: varchar('producer', { length: 255 }).notNull(),
  vintage: integer('vintage'),
  region: varchar('region', { length: 128 }).notNull(),
  country: varchar('country', { length: 64 }).notNull(),
  type: wineTypeEnum('type').notNull(),
  body: wineBodyEnum('body').notNull(),
  grapeVarietals: varchar('grape_varietals', { length: 255 }).notNull(),
  servingTempCelsius: integer('serving_temp_celsius'),
  glassPriceCents: integer('glass_price_cents'),
  bottlePriceCents: integer('bottle_price_cents').notNull(),
  tastingNotes: text('tasting_notes').notNull(),
  acidityScore: integer('acidity_score').notNull(),
  tanninScore: integer('tannin_score').notNull(),
  bodyScore: integer('body_score').notNull(),
  oakScore: integer('oak_score').notNull(),
  intensityScore: integer('intensity_score').notNull(),
  isOrganicBiodynamic: boolean('is_organic_biodynamic').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const winePairings = pgTable('wine_pairings', {
  id: uuid('id').primaryKey().defaultRandom(),
  menuItemId: uuid('menu_item_id').notNull().references(() => menuItems.id, { onDelete: 'cascade' }),
  wineId: uuid('wine_id').notNull().references(() => wines.id, { onDelete: 'cascade' }),
  pairingType: varchar('pairing_type', { length: 32 }).default('classic').notNull(),
  pairingNotes: text('pairing_notes').notNull(),
  displayPriority: integer('display_priority').default(1).notNull(),
});

export const reservations = pgTable('reservations', {
  id: uuid('id').primaryKey().defaultRandom(),
  confirmationCode: varchar('confirmation_code', { length: 16 }).unique().notNull(),
  restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
  tableId: uuid('table_id').references(() => tables.id, { onDelete: 'set null' }),
  guestName: varchar('guest_name', { length: 128 }).notNull(),
  guestEmail: varchar('guest_email', { length: 128 }).notNull(),
  guestPhone: varchar('guest_phone', { length: 32 }).notNull(),
  partySize: integer('party_size').notNull(),
  reservationDate: date('reservation_date').notNull(),
  reservationTime: time('reservation_time').notNull(),
  status: reservationStatusEnum('status').default('confirmed').notNull(),
  dietaryNotes: text('dietary_notes'),
  specialRequests: text('special_requests'),
  gdprConsentTimestamp: timestamp('gdpr_consent_timestamp', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const gdprConsents = pgTable('gdpr_consents', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: varchar('session_id', { length: 128 }).notNull(),
  ipHash: varchar('ip_hash', { length: 64 }).notNull(),
  necessaryAccepted: boolean('necessary_accepted').default(true).notNull(),
  analyticsAccepted: boolean('analytics_accepted').default(false).notNull(),
  marketingAccepted: boolean('marketing_accepted').default(false).notNull(),
  consentVersion: varchar('consent_version', { length: 16 }).default('2.0').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
```
