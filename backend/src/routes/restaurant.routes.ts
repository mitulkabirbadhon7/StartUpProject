import { Router } from 'express';
import { getRestaurantDetails } from '../controllers/restaurant.controller';

const router = Router();

router.get('/:slug', getRestaurantDetails);

export default router;
