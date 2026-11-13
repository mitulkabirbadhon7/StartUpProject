import { z } from 'zod';

export const ReservationCreateSchema = z.object({
  restaurantId: z.string().uuid({ message: 'Valid restaurant UUID is required' }),
  tableId: z.string().uuid({ message: 'Valid table UUID' }).optional(),
  seatingZone: z.enum(['terrace', 'main_hall', 'wine_bar', 'chef_counter'], {
    errorMap: () => ({ message: 'Please select a valid dining zone' }),
  }),
  reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be formatted as YYYY-MM-DD',
  }),
  reservationTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'Time must be in 24-hour format (HH:mm)',
  }),
  partySize: z.number().int().min(1, 'Minimum party size is 1').max(20, 'For parties larger than 20, please contact our concierge directly'),
  guestName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  guestEmail: z.string().email('Please enter a valid European email address'),
  guestPhone: z.string().min(6, 'Please enter a valid phone number with country code'),
  dietaryNotes: z.string().max(500).optional(),
  specialRequests: z.string().max(500).optional(),
  gdprConsentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge the European GDPR privacy policy' }),
  }),
});

export type ReservationCreateInput = z.infer<typeof ReservationCreateSchema>;

export const MenuFilterSchema = z.object({
  dietary: z.string().optional(), // comma-separated: 'vegan,gluten_free'
  allergensExclude: z.string().optional(), // comma-separated: 'nuts,milk'
  isSeasonalOnly: z.enum(['true', 'false']).optional(),
  currency: z.enum(['EUR', 'GBP', 'CHF']).default('EUR'),
});

export type MenuFilterQuery = z.infer<typeof MenuFilterSchema>;

export const GdprConsentSchema = z.object({
  sessionId: z.string().min(8),
  necessaryAccepted: z.boolean().default(true),
  analyticsAccepted: z.boolean().default(false),
  marketingAccepted: z.boolean().default(false),
  consentVersion: z.string().default('2.0'),
});

export type GdprConsentInput = z.infer<typeof GdprConsentSchema>;
