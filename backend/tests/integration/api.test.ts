import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/index';

describe('Integration Test: Express API Endpoints', () => {
  describe('Health Check Endpoint', () => {
    it('returns 200 OK with healthy status and metadata', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.service).toBe('European Dining Demos API');
      expect(res.body.version).toBe('1.0.0');
    });
  });

  describe('Restaurants Endpoint', () => {
    it("returns details for L'Étoile & Terroir bistro with valid UUID", async () => {
      const res = await request(app).get('/api/v1/restaurants/letoile-terroir');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
      expect(res.body.data.slug).toBe('letoile-terroir');
      expect(res.body.data.name).toBe("L'Étoile & Terroir");
      expect(res.body.data.currency).toBe('EUR');
      expect(res.body.data.theme.primaryColor).toBe('#2A1E17');
    });

    it('returns details for Lievito Madre artisan pizzeria with valid UUID', async () => {
      const res = await request(app).get('/api/v1/restaurants/lievito-madre');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22');
      expect(res.body.data.slug).toBe('lievito-madre');
      expect(res.body.data.name).toBe('Lievito Madre');
      expect(res.body.data.theme.primaryColor).toBe('#1C1A18');
    });

    it('returns 404 for an unknown restaurant slug', async () => {
      const res = await request(app).get('/api/v1/restaurants/non-existent-restaurant');
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.code).toBe('RESTAURANT_NOT_FOUND');
    });
  });

  describe('Floorplan Endpoint', () => {
    it('returns interactive SVG floorplan layout and zones for bistro', async () => {
      const res = await request(app).get('/api/v1/floorplans/letoile-terroir');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.zones).toBeInstanceOf(Array);
      expect(res.body.data.tables).toBeInstanceOf(Array);
      expect(res.body.data.zones.length).toBeGreaterThan(0);
      expect(res.body.data.tables.length).toBeGreaterThan(0);
    });

    it('returns hearth counter layout and pergola terrace for pizzeria', async () => {
      const res = await request(app).get('/api/v1/floorplans/lievito-madre');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.restaurantSlug).toBe('lievito-madre');
      expect(res.body.data.zones.some((z: { slug: string }) => z.slug === 'hearth_counter')).toBe(true);
    });

    it('returns 404 for unknown restaurant floorplan', async () => {
      const res = await request(app).get('/api/v1/floorplans/non-existent-restaurant');
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.code).toBe('RESTAURANT_NOT_FOUND');
    });
  });

  describe('Menu & Pairing Endpoint', () => {
    it('returns menu items with wine pairings for bistro', async () => {
      const res = await request(app).get('/api/v1/menu/items?restaurantSlug=letoile-terroir');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].winePairing).toBeDefined();
    });

    it('returns artisan sourdough pizzas for Lievito Madre', async () => {
      const res = await request(app).get('/api/v1/menu/items?restaurantSlug=lievito-madre');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.some((d: { id: string }) => d.id === 'piz-01')).toBe(true);
    });

    it('correctly filters menu items by dietary preferences', async () => {
      const res = await request(app).get('/api/v1/menu/items?restaurantSlug=letoile-terroir&dietary=vegetarian');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      const allVegetarian = res.body.data.every((dish: { isVegetarian: boolean }) => dish.isVegetarian);
      expect(allVegetarian).toBe(true);
    });

    it('correctly excludes dishes by EU allergens', async () => {
      const res = await request(app).get('/api/v1/menu/items?restaurantSlug=letoile-terroir&allergensExclude=nuts');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      const containsNuts = res.body.data.some((dish: { allergens: string[] }) => dish.allergens.includes('nuts'));
      expect(containsNuts).toBe(false);
    });

    it('correctly filters only seasonal items', async () => {
      const res = await request(app).get('/api/v1/menu/items?restaurantSlug=letoile-terroir&isSeasonalOnly=true');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      const allSeasonal = res.body.data.every((dish: { isSeasonal: boolean }) => dish.isSeasonal);
      expect(allSeasonal).toBe(true);
    });

    it('rejects invalid query currency parameter with 400', async () => {
      const res = await request(app).get('/api/v1/menu/items?currency=INVALID');
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.code).toBe('INVALID_QUERY_PARAMETERS');
    });

    it('returns 5-axis sommelier wine pairing for specific dish', async () => {
      const res = await request(app).get('/api/v1/menu/dish-01/wine-pairing');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.dishTitle).toBe('Pan-Seared Brittany Turbot Carpaccio');
      expect(res.body.pairing.wineName).toBe('2022 Domaine Leflaive Puligny-Montrachet');
      expect(res.body.pairing.radar.acidity).toBe(4.8);
    });

    it('returns 404 for pairing request on non-existent dish', async () => {
      const res = await request(app).get('/api/v1/menu/non-existent-dish-99/wine-pairing');
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.code).toBe('PAIRING_NOT_FOUND');
    });
  });

  describe('Reservation Workflow Endpoint', () => {
    it('creates a table reservation with valid data and returns calendar .ics payload', async () => {
      const reservationData = {
        restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        seatingZone: 'terrace',
        reservationDate: '2026-12-25',
        reservationTime: '19:30',
        partySize: 2,
        guestName: 'Eleanor Vance',
        guestEmail: 'eleanor@vance-gastronomy.com',
        guestPhone: '+33612984512',
        dietaryNotes: 'Pescatarian, olive oil tasting preferred',
        gdprConsentGiven: true,
      };

      const res = await request(app)
        .post('/api/v1/reservations')
        .send(reservationData);

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.confirmationCode).toBeDefined();
      expect(res.body.data.status).toBe('confirmed');
      expect(res.body.calendarPayload).toContain('BEGIN:VCALENDAR');
      expect(res.body.calendarPayload).toContain("SUMMARY:Dinner Reservation: L'Étoile & Terroir");
      expect(res.body.calendarPayload).toContain('14 Rue Saint-Honoré, 75001 Paris, France');
      expect(res.body.calendarPayload).toContain('END:VCALENDAR');
    });

    it('creates a pizzeria reservation with Naples location in calendar .ics payload', async () => {
      const reservationData = {
        restaurantId: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        seatingZone: 'chef_counter',
        reservationDate: '2026-12-28',
        reservationTime: '20:15',
        partySize: 2,
        guestName: 'Matteo Rossi',
        guestEmail: 'matteo@napoli-gourmet.it',
        guestPhone: '+390815551290',
        gdprConsentGiven: true,
      };

      const res = await request(app)
        .post('/api/v1/reservations')
        .send(reservationData);

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.calendarPayload).toContain('SUMMARY:Dinner Reservation: Lievito Madre');
      expect(res.body.calendarPayload).toContain('Via dei Tribunali 32, 80138 Naples, Italy');
    });

    it('rejects reservation with 400 when GDPR consent is false', async () => {
      const invalidData = {
        restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        seatingZone: 'terrace',
        reservationDate: '2026-12-25',
        reservationTime: '19:30',
        partySize: 2,
        guestName: 'Eleanor Vance',
        guestEmail: 'eleanor@vance-gastronomy.com',
        guestPhone: '+33612984512',
        gdprConsentGiven: false,
      };

      const res = await request(app)
        .post('/api/v1/reservations')
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.code).toBe('VALIDATION_FAILED');
    });

    it('rejects reservation with party size exceeding maximum allowed', async () => {
      const invalidData = {
        restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        seatingZone: 'main_hall',
        reservationDate: '2026-12-25',
        reservationTime: '19:30',
        partySize: 35,
        guestName: 'Eleanor Vance',
        guestEmail: 'eleanor@vance-gastronomy.com',
        guestPhone: '+33612984512',
        gdprConsentGiven: true,
      };

      const res = await request(app)
        .post('/api/v1/reservations')
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
    });
  });

  describe('Undefined Routes 404 Handler', () => {
    it('returns structured JSON 404 for undefined API routes', async () => {
      const res = await request(app).get('/api/v1/non-existent-endpoint');
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.code).toBe('ROUTE_NOT_FOUND');
    });
  });
});
