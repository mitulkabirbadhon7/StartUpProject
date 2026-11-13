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

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 128 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 32 }).default('manager').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
