import { Router } from 'express';
import { getMenuItems, getWinePairingForDish } from '../controllers/menu.controller';
import { validateQuery } from '../middlewares/validate';
import { MenuFilterSchema } from '@european-dining/shared';

const router = Router();

router.get('/', validateQuery(MenuFilterSchema), getMenuItems);
router.get('/items', validateQuery(MenuFilterSchema), getMenuItems);
router.get('/:dishId/wine-pairing', getWinePairingForDish);

export default router;
