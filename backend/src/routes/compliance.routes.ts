import { Router } from 'express';
import { recordGdprConsent } from '../controllers/compliance.controller';
import { validate } from '../middlewares/validate';
import { GdprConsentSchema } from '@european-dining/shared';

const router = Router();

router.post('/consent', validate(GdprConsentSchema), recordGdprConsent);

export default router;
