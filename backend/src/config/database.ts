import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    // Testar conexão
    await prisma.$connect();
    console.log(`✅ Supabase PostgreSQL conectado`);
    return prisma;
  } catch (error) {
    console.error(`❌ Erro ao conectar Supabase:`, error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Supabase desconectado');
  } catch (error) {
    console.error('❌ Erro ao desconectar Supabase:', error);
    process.exit(1);
  }
};

export default prisma;
