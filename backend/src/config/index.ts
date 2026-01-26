import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/melloz',
  jwtSecret: process.env.JWT_SECRET || 'super_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  frontendUrl: process.env.FRONTEND_URL || 'https://melloz.vercel.app',
};

if (config.nodeEnv === 'production' && config.jwtSecret === 'super_secret_key') {
  console.warn('⚠️  AVISO: JWT_SECRET não foi alterado em produção!');
}

if (!config.databaseUrl.includes('postgresql')) {
  console.warn('⚠️  Aviso: DATABASE_URL não parece ser uma URL PostgreSQL válida');
}
