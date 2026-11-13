import { Router } from 'express';
import { getMenuItems, getWinePairingForDish } from '../controllers/menu.controller';

const router = Router();

router.get('/', getMenuItems);
router.get('/:dishId/wine-pairing', getWinePairingForDish);

export default router;
