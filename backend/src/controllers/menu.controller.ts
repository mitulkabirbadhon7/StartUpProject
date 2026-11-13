import { Request, Response, NextFunction } from 'express';

const BISTRO_MENU_ITEMS = [
  {
    id: 'dish-01',
    categoryId: 'cat-starters',
    titleEn: 'Pan-Seared Brittany Turbot Carpaccio',
    titleLocal: 'Carpaccio de Turbot de Bretagne',
    descriptionEn: 'Thinly shaved wild turbot, pickled sea fennel, citrus gel, and cold-pressed Dordogne olive oil.',
    priceCents: 2600,
    isSignature: true,
    isSeasonal: true,
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: true,
    isDairyFree: true,
    isHalal: true,
    allergens: ['fish'],
    imageUrl: '/images/dishes/turbot-carpaccio.webp',
    winePairing: {
      wineName: '2022 Domaine Leflaive Puligny-Montrachet',
      vintage: 2022,
      region: 'Burgundy, France',
      type: 'white',
      bottlePriceCents: 14500,
      glassPriceCents: 2800,
      tastingNotes: 'Crisp green apple, crushed limestone minerality, and toasted hazelnut nuances.',
      radar: { acidity: 4.8, tannins: 1.0, body: 3.8, oak: 3.2, intensity: 4.5 },
    },
  },
  {
    id: 'dish-02',
    categoryId: 'cat-mains',
    titleEn: 'Woodland Perigord Truffle Tagliolini',
    titleLocal: 'Tagliolini aux Truffes Noires du Périgord',
    descriptionEn: 'Hand-rolled egg pasta, 24-month cultured Normandy butter, and shaved winter tuber melanosporum.',
    priceCents: 3800,
    isSignature: true,
    isSeasonal: true,
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isDairyFree: false,
    isHalal: true,
    allergens: ['gluten', 'eggs', 'milk'],
    imageUrl: '/images/dishes/truffle-tagliolini.webp',
    winePairing: {
      wineName: '2019 Vietti Barolo Castiglione',
      vintage: 2019,
      region: 'Piedmont, Italy',
      type: 'red',
      bottlePriceCents: 11000,
      glassPriceCents: 2400,
      tastingNotes: 'Dried rose petals, ripe red cherry, tar, and silken forest-floor tannins.',
      radar: { acidity: 4.5, tannins: 4.9, body: 4.7, oak: 3.5, intensity: 4.8 },
    },
  },
  {
    id: 'dish-03',
    categoryId: 'cat-mains',
    titleEn: 'Charcoal-Grilled Heirloom Aubergine & Artichoke',
    titleLocal: 'Aubergine Fumée et Artichauts Barigoule',
    descriptionEn: 'Smoked Japanese aubergine, glazed Romanesco artichokes, pine nut emulsion, and pomegranate reduction.',
    priceCents: 2800,
    isSignature: false,
    isSeasonal: true,
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: true,
    isDairyFree: true,
    isHalal: true,
    allergens: ['nuts'],
    imageUrl: '/images/dishes/aubergine-barigoule.webp',
    winePairing: {
      wineName: '2021 Domaine Tempier Bandol Rosé',
      vintage: 2021,
      region: 'Provence, France',
      type: 'rose',
      bottlePriceCents: 7500,
      glassPriceCents: 1800,
      tastingNotes: 'Peach nectar, blood orange zest, delicate wild herbs, and chalky salinity.',
      radar: { acidity: 4.2, tannins: 1.5, body: 3.2, oak: 1.0, intensity: 4.0 },
    },
  },
  {
    id: 'dish-04',
    categoryId: 'cat-desserts',
    titleEn: 'Valrhona Grand Cru Dark Chocolate Soufflé',
    titleLocal: 'Soufflé Chaud au Chocolat Guanaja 70%',
    descriptionEn: 'Molten Grand Cru dark chocolate, single-origin Tahitian vanilla bean anglaise, and fleur de sel.',
    priceCents: 1800,
    isSignature: true,
    isSeasonal: false,
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
    isDairyFree: false,
    isHalal: true,
    allergens: ['gluten', 'eggs', 'milk'],
    imageUrl: '/images/dishes/chocolate-souffle.webp',
    winePairing: {
      wineName: '2017 Château d’Yquem Sauternes Premier Cru',
      vintage: 2017,
      region: 'Bordeaux, France',
      type: 'digestif',
      bottlePriceCents: 26000,
      glassPriceCents: 4500,
      tastingNotes: 'Candied apricot, honeysuckle blossoms, saffron, and vibrant crystalline acidity.',
      radar: { acidity: 4.6, tannins: 1.0, body: 4.9, oak: 4.2, intensity: 5.0 },
    },
  },
];

export const getMenuItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { dietary, allergensExclude, isSeasonalOnly } = req.query;

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    let filtered = [...BISTRO_MENU_ITEMS];

    if (dietary) {
      const filters = (dietary as string).split(',');
      if (filters.includes('vegan')) filtered = filtered.filter((d) => d.isVegan);
      if (filters.includes('vegetarian')) filtered = filtered.filter((d) => d.isVegetarian);
      if (filters.includes('gluten_free')) filtered = filtered.filter((d) => d.isGlutenFree);
      if (filters.includes('dairy_free')) filtered = filtered.filter((d) => d.isDairyFree);
      if (filters.includes('halal')) filtered = filtered.filter((d) => d.isHalal);
    }

    if (allergensExclude) {
      const excluded = (allergensExclude as string).split(',');
      filtered = filtered.filter((d) => !d.allergens.some((a) => excluded.includes(a)));
    }

    if (isSeasonalOnly === 'true') {
      filtered = filtered.filter((d) => d.isSeasonal);
    }

    res.json({
      status: 'success',
      totalCount: BISTRO_MENU_ITEMS.length,
      filteredCount: filtered.length,
      data: filtered,
    });
  } catch (error) {
    next(error);
  }
};

export const getWinePairingForDish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { dishId } = req.params;
    const dish = BISTRO_MENU_ITEMS.find((d) => d.id === dishId);

    if (!dish || !dish.winePairing) {
      res.status(404).json({
        status: 'error',
        code: 'PAIRING_NOT_FOUND',
        message: 'No sommelier wine pairing registered for this culinary item',
      });
      return;
    }

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.json({
      status: 'success',
      dishTitle: dish.titleEn,
      pairing: dish.winePairing,
    });
  } catch (error) {
    next(error);
  }
};
