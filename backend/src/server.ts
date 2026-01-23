import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { connectDB, disconnectDB } from './config/database.js';
import { authMiddleware, errorHandler } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app: Express = express();

// Middlewares globais
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rotas de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error Handler
app.use(errorHandler);

// Inicializar servidor
const PORT = config.port as number;

const startServer = async () => {
  try {
    // Conectar ao banco de dados (Supabase PostgreSQL)
    await connectDB();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   🎵 MELLOZ BACKEND INICIADO          ║
╠════════════════════════════════════════╣
║   Servidor rodando em: http://localhost:${PORT}
║   Ambiente: ${config.nodeEnv}
║   Banco de dados: Supabase PostgreSQL
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await disconnectDB();
  process.exit(0);
});

export default app;

// Iniciar se for o arquivo principal
startServer();
