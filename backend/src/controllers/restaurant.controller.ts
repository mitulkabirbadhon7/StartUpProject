import { Request, Response, NextFunction } from 'express';

export const getRestaurantDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    // Cache-Control headers for high-performance edge caching
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');

    if (slug === 'letoile-terroir') {
      res.json({
        status: 'success',
        data: {
          id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
          slug: 'letoile-terroir',
          name: "L'Étoile & Terroir",
          type: 'fine_dining_bistro',
          headline: 'Artisanal French & Alpine Gastronomy in Central Europe',
          description: 'A celebration of biodynamic terroirs, seasonal game, and heritage French culinary excellence.',
          currency: 'EUR',
          address: {
            street: '14 Rue Saint-Honoré',
            city: 'Paris',
            postalCode: '75001',
            country: 'France',
          },
          contact: {
            phone: '+33 1 42 68 55 00',
            email: 'reservations@letoile-terroir.fr',
            whatsapp: '+33612345678',
            googleMapsUrl: 'https://maps.google.com/?q=Paris+1st+Arrondissement',
          },
          theme: {
            primaryColor: '#2A1E17',
            accentColor: '#5E1924',
            lightAccent: '#F3E5AB',
            bgColor: '#F7F4EE',
          },
        },
      });
      return;
    }

    if (slug === 'lievito-madre') {
      res.json({
        status: 'success',
        data: {
          id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
          slug: 'lievito-madre',
          name: 'Lievito Madre',
          type: 'artisan_pizzeria',
          headline: '48-Hour Heritage Fermentation & Neapolitan Wood-Fired Craft',
          description: 'Organic stone-ground grains, D.O.P. San Marzano tomatoes, and 450°C birchwood blistering.',
          currency: 'EUR',
          address: {
            street: 'Via dei Tribunali 32',
            city: 'Naples',
            postalCode: '80138',
            country: 'Italy',
          },
          contact: {
            phone: '+39 081 555 1290',
            email: 'ciao@lievitomadre-artisan.it',
            whatsapp: '+393339876543',
            googleMapsUrl: 'https://maps.google.com/?q=Naples+Historic+Centre',
          },
          theme: {
            primaryColor: '#1C1A18',
            accentColor: '#C86D51',
            lightAccent: '#D9822B',
            bgColor: '#FAF8F5',
          },
        },
      });
      return;
    }

    res.status(404).json({
      status: 'error',
      code: 'RESTAURANT_NOT_FOUND',
      message: `No European restaurant found for slug: ${slug}`,
    });
  } catch (error) {
    next(error);
  }
};
