import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env';
import { apiLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import apiRoutes from './routes';

const app = express();

// Security & Header hardening
app.use(helmet({
  hidePoweredBy: true,
  contentSecurityPolicy: false, // Managed by Next.js in production
}));

// CORS Configuration
app.use(cors({
  origin: [env.FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
}));

// Body parsing with payload size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global Rate Limiter
app.use('/api/', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'European Dining Demos API',
    version: '1.0.0',
  });
});

// Mount API v1 Routes
app.use('/api/v1', apiRoutes);

// Global Centralized Error Handling
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    console.log(`[European Dining Backend] Server listening on http://localhost:${env.PORT}`);
    console.log(`[European Dining Backend] Environment: ${env.NODE_ENV}`);
  });
}

export default app;
