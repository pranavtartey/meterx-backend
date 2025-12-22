/**
 * Central Configuration - All environment variables in one place
 *
 * Usage: configService.get<string>('database.host')
 *        configService.get<number>('port')
 */
export default () => ({
  // Application
  port: parseInt(process.env.PORT || '8080', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: (process.env.CORS_ORIGINS || '*').split(','),

  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    synchronize: false,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '86400', 10),
  },

  // Swagger/API Docs (optional - defaults provided)
  swagger: {
    title: process.env.API_TITLE || 'METER-X API',
    description: process.env.API_DESCRIPTION || 'Decentralized api service',
    version: process.env.API_VERSION || '1.0',
    docsPath: process.env.API_DOCS_PATH || 'api/docs',
  },
});
