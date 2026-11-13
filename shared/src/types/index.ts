export type RestaurantType = 'fine_dining_bistro' | 'artisan_pizzeria';
export type TableShape = 'circular' | 'rectangular' | 'booth' | 'counter';
export type TableZone = 'terrace' | 'main_hall' | 'wine_bar' | 'chef_counter';
export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show';
export type CurrencyCode = 'EUR' | 'GBP' | 'CHF';

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  type: RestaurantType;
  headline: string;
  description: string;
  currency: CurrencyCode;
  addressStreet: string;
  addressCity: string;
  addressPostalCode: string;
  addressCountry: string;
  phone: string;
  email: string;
  whatsappNumber?: string;
  googleMapsUrl?: string;
}

export interface Zone {
  id: string;
  restaurantId: string;
  slug: TableZone;
  name: string;
  description?: string;
  ambientNotes?: string;
  displayOrder: number;
}

export interface Table {
  id: string;
  zoneId: string;
  tableNumber: string;
  minCapacity: number;
  maxCapacity: number;
  shape: TableShape;
  svgXCoord: number;
  svgYCoord: number;
  svgWidth: number;
  svgHeight: number;
  isActive: boolean;
  isAvailable?: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  titleEn: string;
  titleLocal: string;
  descriptionEn: string;
  descriptionLocal?: string;
  priceCents: number;
  isSignature: boolean;
  isSeasonal: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isHalal: boolean;
  isActive: boolean;
  imageUrl?: string;
  allergens: string[];
}

export interface Wine {
  id: string;
  restaurantId: string;
  name: string;
  producer: string;
  vintage?: number;
  region: string;
  country: string;
  type: 'red' | 'white' | 'rose' | 'sparkling' | 'orange' | 'digestif' | 'non_alcoholic';
  body: 'light' | 'medium' | 'full';
  grapeVarietals: string;
  servingTempCelsius?: number;
  glassPriceCents?: number;
  bottlePriceCents: number;
  tastingNotes: string;
  acidityScore: number; // 1-5
  tanninScore: number;  // 1-5
  bodyScore: number;    // 1-5
  oakScore: number;     // 1-5
  intensityScore: number; // 1-5
  isOrganicBiodynamic: boolean;
}

export interface WinePairing {
  id: string;
  menuItemId: string;
  wine: Wine;
  pairingType: 'classic' | 'adventurous' | 'non_alcoholic';
  pairingNotes: string;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  restaurantId: string;
  tableId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  status: ReservationStatus;
  dietaryNotes?: string;
  specialRequests?: string;
  gdprConsentTimestamp: string;
}
