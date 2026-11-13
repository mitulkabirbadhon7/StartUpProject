import { Request, Response, NextFunction } from 'express';

export const getFloorplan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    if (slug !== 'letoile-terroir' && slug !== 'lievito-madre') {
      res.status(404).json({
        status: 'error',
        code: 'RESTAURANT_NOT_FOUND',
        message: `No European restaurant floorplan found for slug: ${slug}`,
      });
      return;
    }

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

    if (slug === 'lievito-madre') {
      const pizzeriaZones = [
        { id: 'zone-p1', slug: 'hearth_counter', name: '450°C Wood-Fired Hearth Bar', ambientNotes: 'Front-row view of Stefano Ferrara oven and pizza masters' },
        { id: 'zone-p2', slug: 'main_hall', name: 'Sala Principale', ambientNotes: 'Rustic brick arches, terracotta floor, lively Neapolitan buzz' },
        { id: 'zone-p3', slug: 'terrace', name: 'Pergola Garden Terrace', ambientNotes: 'Lemon trees, evening warm festoon lights, street acoustics' },
      ];

      const pizzeriaTables = [
        { id: 'tbl-p-h1', zoneId: 'zone-p1', tableNumber: 'H1', minCapacity: 1, maxCapacity: 2, shape: 'counter', svgX: 180, svgY: 100, isAvailable: true },
        { id: 'tbl-p-h2', zoneId: 'zone-p1', tableNumber: 'H2', minCapacity: 1, maxCapacity: 2, shape: 'counter', svgX: 280, svgY: 100, isAvailable: true },
        { id: 'tbl-p-s1', zoneId: 'zone-p2', tableNumber: 'S1', minCapacity: 2, maxCapacity: 4, shape: 'rectangular', svgX: 450, svgY: 180, isAvailable: true },
        { id: 'tbl-p-s2', zoneId: 'zone-p2', tableNumber: 'S2', minCapacity: 4, maxCapacity: 6, shape: 'rectangular', svgX: 450, svgY: 300, isAvailable: false },
        { id: 'tbl-p-t1', zoneId: 'zone-p3', tableNumber: 'P1', minCapacity: 2, maxCapacity: 4, shape: 'circular', svgX: 720, svgY: 180, isAvailable: true },
        { id: 'tbl-p-t2', zoneId: 'zone-p3', tableNumber: 'P2', minCapacity: 4, maxCapacity: 8, shape: 'booth', svgX: 720, svgY: 300, isAvailable: true },
      ];

      res.json({
        status: 'success',
        data: {
          restaurantSlug: slug,
          viewBox: '0 0 900 550',
          zones: pizzeriaZones,
          tables: pizzeriaTables,
        },
      });
      return;
    }

    const zones = [
      { id: 'zone-1', slug: 'terrace', name: 'Heated Garden Terrace', ambientNotes: 'Lanterns, fragrant jasmine, gentle breeze' },
      { id: 'zone-2', slug: 'main_hall', name: 'Grand Dining Hall', ambientNotes: 'Acoustic jazz, candlelit oak tables, velvet booths' },
      { id: 'zone-3', slug: 'wine_bar', name: 'Sommelier Wine Vault', ambientNotes: 'Direct cellar view, marble bar, sommelier service' },
      { id: 'zone-4', slug: 'chef_counter', name: "Chef's Pass Counter", ambientNotes: 'Direct view of the open fire and culinary brigade' },
    ];

    const tables = [
      // Terrace
      { id: 'tbl-t1', zoneId: 'zone-1', tableNumber: 'T1', minCapacity: 2, maxCapacity: 2, shape: 'circular', svgX: 80, svgY: 100, isAvailable: true },
      { id: 'tbl-t2', zoneId: 'zone-1', tableNumber: 'T2', minCapacity: 2, maxCapacity: 4, shape: 'circular', svgX: 80, svgY: 220, isAvailable: false },
      { id: 'tbl-t3', zoneId: 'zone-1', tableNumber: 'T3', minCapacity: 4, maxCapacity: 6, shape: 'rectangular', svgX: 80, svgY: 360, isAvailable: true },

      // Main Hall
      { id: 'tbl-m1', zoneId: 'zone-2', tableNumber: 'M1', minCapacity: 2, maxCapacity: 2, shape: 'circular', svgX: 320, svgY: 100, isAvailable: true },
      { id: 'tbl-m2', zoneId: 'zone-2', tableNumber: 'M2', minCapacity: 4, maxCapacity: 4, shape: 'rectangular', svgX: 450, svgY: 100, isAvailable: true },
      { id: 'tbl-m3', zoneId: 'zone-2', tableNumber: 'M3', minCapacity: 4, maxCapacity: 6, shape: 'rectangular', svgX: 320, svgY: 240, isAvailable: false },
      { id: 'tbl-m4', zoneId: 'zone-2', tableNumber: 'M4', minCapacity: 6, maxCapacity: 8, shape: 'booth', svgX: 450, svgY: 240, isAvailable: true },

      // Wine Vault
      { id: 'tbl-w1', zoneId: 'zone-3', tableNumber: 'W1', minCapacity: 2, maxCapacity: 2, shape: 'circular', svgX: 720, svgY: 100, isAvailable: true },
      { id: 'tbl-w2', zoneId: 'zone-3', tableNumber: 'W2', minCapacity: 2, maxCapacity: 4, shape: 'rectangular', svgX: 720, svgY: 220, isAvailable: true },

      // Chef Counter
      { id: 'tbl-c1', zoneId: 'zone-4', tableNumber: 'C1', minCapacity: 1, maxCapacity: 2, shape: 'counter', svgX: 320, svgY: 420, isAvailable: true },
      { id: 'tbl-c2', zoneId: 'zone-4', tableNumber: 'C2', minCapacity: 1, maxCapacity: 2, shape: 'counter', svgX: 420, svgY: 420, isAvailable: true },
      { id: 'tbl-c3', zoneId: 'zone-4', tableNumber: 'C3', minCapacity: 1, maxCapacity: 2, shape: 'counter', svgX: 520, svgY: 420, isAvailable: false },
    ];

    res.json({
      status: 'success',
      data: {
        restaurantSlug: slug,
        viewBox: '0 0 900 550',
        zones,
        tables,
      },
    });
  } catch (error) {
    next(error);
  }
};
