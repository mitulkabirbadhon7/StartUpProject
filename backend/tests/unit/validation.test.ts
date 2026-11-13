import { describe, it, expect } from 'vitest';
import { ReservationCreateSchema, MenuFilterSchema, GdprConsentSchema } from '@european-dining/shared';
import { hashPassword, verifyPassword } from '../../src/middlewares/auth';

describe('Unit Test: Zod Schema Validation', () => {
  it('validates a correct European dining reservation payload', () => {
    const validPayload = {
      restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      seatingZone: 'terrace' as const,
      reservationDate: '2026-12-24',
      reservationTime: '20:30',
      partySize: 4,
      guestName: 'Henri de Toulouse',
      guestEmail: 'henri@domain.fr',
      guestPhone: '+33612345678',
      dietaryNotes: 'One guest celiac, dedicated fryer required',
      gdprConsentGiven: true as const,
    };

    const result = ReservationCreateSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects reservation with non-UUID restaurantId', () => {
    const invalidPayload = {
      restaurantId: 'bistro-001',
      seatingZone: 'terrace' as const,
      reservationDate: '2026-12-24',
      reservationTime: '20:30',
      partySize: 2,
      guestName: 'Jean Dupont',
      guestEmail: 'jean@domain.fr',
      guestPhone: '+33612345678',
      gdprConsentGiven: true as const,
    };

    const result = ReservationCreateSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('rejects reservation when party size exceeds limit of 20', () => {
    const invalidPayload = {
      restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      seatingZone: 'main_hall' as const,
      reservationDate: '2026-12-24',
      reservationTime: '20:00',
      partySize: 25,
      guestName: 'Jean Dupont',
      guestEmail: 'jean@domain.fr',
      guestPhone: '+33612345678',
      gdprConsentGiven: true as const,
    };

    const result = ReservationCreateSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('rejects reservation with invalid seating zone', () => {
    const invalidPayload = {
      restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      seatingZone: 'rooftop_lounge' as any,
      reservationDate: '2026-12-24',
      reservationTime: '20:00',
      partySize: 2,
      guestName: 'Jean Dupont',
      guestEmail: 'jean@domain.fr',
      guestPhone: '+33612345678',
      gdprConsentGiven: true as const,
    };

    const result = ReservationCreateSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('rejects reservation when GDPR consent is omitted', () => {
    const invalidPayload = {
      restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      seatingZone: 'terrace' as const,
      reservationDate: '2026-12-24',
      reservationTime: '20:30',
      partySize: 2,
      guestName: 'Jean Dupont',
      guestEmail: 'jean@domain.fr',
      guestPhone: '+33612345678',
      gdprConsentGiven: false,
    };

    const result = ReservationCreateSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('rejects invalid reservation time format', () => {
    const invalidPayload = {
      restaurantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      seatingZone: 'main_hall' as const,
      reservationDate: '2026-12-24',
      reservationTime: '8pm', // Should be HH:mm 24-hour
      partySize: 2,
      guestName: 'Jean Dupont',
      guestEmail: 'jean@domain.fr',
      guestPhone: '+33612345678',
      gdprConsentGiven: true,
    };

    const result = ReservationCreateSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('sanitizes and parses valid menu dietary filters', () => {
    const query = {
      restaurantSlug: 'letoile-terroir',
      dietary: 'vegan,gluten_free',
      isSeasonalOnly: 'true' as const,
      currency: 'EUR' as const,
    };

    const result = MenuFilterSchema.safeParse(query);
    expect(result.success).toBe(true);
  });

  it('rejects unsupported currency code in MenuFilterSchema', () => {
    const query = {
      currency: 'USD',
    };

    const result = MenuFilterSchema.safeParse(query);
    expect(result.success).toBe(false);
  });

  it('validates GDPR cookie consent payloads', () => {
    const validConsent = {
      sessionId: 'sess-89472-europe',
      necessaryAccepted: true,
      analyticsAccepted: true,
      marketingAccepted: false,
      consentVersion: '2.0',
    };

    const result = GdprConsentSchema.safeParse(validConsent);
    expect(result.success).toBe(true);

    const invalidConsent = {
      sessionId: 'short', // Min length 8
    };
    expect(GdprConsentSchema.safeParse(invalidConsent).success).toBe(false);
  });
});

describe('Unit Test: Cryptographic Password & Auth Verification', () => {
  it('correctly hashes and verifies passwords in timing-safe manner', () => {
    const plain = 'EuropeanLuxuryDining2026!';
    const { hash, salt } = hashPassword(plain);

    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
    expect(verifyPassword(plain, hash, salt)).toBe(true);
    expect(verifyPassword('WrongPassword123', hash, salt)).toBe(false);
  });
});
