import { Router } from 'express';
import { getFloorplan } from '../controllers/floorplan.controller';

const router = Router();

router.get('/:slug', getFloorplan);

export default router;
