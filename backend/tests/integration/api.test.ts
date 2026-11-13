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
    it("returns details for L'Étoile & Terroir bistro", async () => {
      const res = await request(app).get('/api/v1/restaurants/letoile-terroir');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.slug).toBe('letoile-terroir');
      expect(res.body.data.name).toBe("L'Étoile & Terroir");
      expect(res.body.data.currency).toBe('EUR');
      expect(res.body.data.theme.primaryColor).toBe('#2A1E17');
    });

    it('returns details for Lievito Madre artisan pizzeria', async () => {
      const res = await request(app).get('/api/v1/restaurants/lievito-madre');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
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
    it('returns interactive SVG floorplan layout and zones for restaurant', async () => {
      const res = await request(app).get('/api/v1/floorplans/letoile-terroir');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.zones).toBeInstanceOf(Array);
      expect(res.body.data.tables).toBeInstanceOf(Array);
      expect(res.body.data.zones.length).toBeGreaterThan(0);
      expect(res.body.data.tables.length).toBeGreaterThan(0);
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

    it('correctly filters menu items by dietary preferences', async () => {
      const res = await request(app).get('/api/v1/menu/items?restaurantSlug=letoile-terroir&dietary=vegetarian');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      const allVegetarian = res.body.data.every((dish: { isVegetarian: boolean }) => dish.isVegetarian);
      expect(allVegetarian).toBe(true);
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
      expect(res.body.calendarPayload).toContain('END:VCALENDAR');
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
    });
  });
});
