import { Router } from 'express';
import restaurantRoutes from './restaurant.routes';
import floorplanRoutes from './floorplan.routes';
import menuRoutes from './menu.routes';
import reservationRoutes from './reservation.routes';
import complianceRoutes from './compliance.routes';

const router = Router();

router.use('/restaurants', restaurantRoutes);
router.use('/floorplans', floorplanRoutes);
router.use('/menu', menuRoutes);
router.use('/reservations', reservationRoutes);
router.use('/compliance', complianceRoutes);

export default router;
