
# ⚡ INÍCIO RÁPIDO - Supabase + Prisma Backend

## 🎯 Em 5 Minutos

Se você só quer rodar o backend agora mesmo, siga isto:

### Opção 1: PostgreSQL Local (SQLite)

```powershell
cd backend

# 1. Instalar dependências
npm install

# 2. Usar SQLite (não precisa de servidor)
# Renomear a linha do .env:
# DATABASE_URL="file:./dev.db"

# 3. Criar migrations
npx prisma migrate dev --name init

# 4. Popular dados
npx ts-node src/seed.ts

# 5. RODAR!
npm run dev
```

✅ **Pronto em 2 minutos** - Servidor rodando em http://localhost:5000

---

### Opção 2: PostgreSQL na Nuvem (Supabase - Recomendado)

```powershell
cd backend

# 1. Instalar
npm install

# 2. Criar conta em https://supabase.com (2 minutos)

# 3. Editar .env
notepad .env

# Adicionar a CONNECTION STRING do Supabase:
# DATABASE_URL="postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# 4. Rodar migrations
npx prisma migrate dev --name init

# 5. Popular dados
npx ts-node src/seed.ts

# 6. RODAR!
npm run dev
```

✅ **Pronto em 5 minutos** - Banco na nuvem, acesso global

---

## 🧪 Testar Endpoints

### 1. Registrar Usuário

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "senha123",
    "name": "Test User"
  }'
```

**Resposta:**
```json
{
  "message": "Usuário criado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clp7x8y9z0",
    "email": "user@test.com",
    "name": "Test User"
  }
}
```

### 2. Fazer Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "senha123"
  }'
```

### 3. Listar Eventos

```bash
curl http://localhost:5000/api/events
```

### 4. Listar Eventos por Vibe

```bash
curl "http://localhost:5000/api/events?vibe=reggae"
```

### 5. Eventos Trending

```bash
curl http://localhost:5000/api/events/trending
```

---

## 📁 Arquivo .env Pronto

### SQLite (Local - Mais Fácil)

```env
# Database
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui_123456
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

### PostgreSQL Local

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/melloz"
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui_123456
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Supabase (Nuvem - Melhor)

```env
# Database (copiar do Supabase Dashboard)
DATABASE_URL="postgresql://postgres:xxxxx@db.xxxxx.supabase.co:5432/postgres"
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui_123456
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

---

## 🔍 Verificar Dados

### Via Prisma Studio

```powershell
npx prisma studio
```

Abre uma interface bonita em http://localhost:5555

### Via SQL (Se PostgreSQL)

```bash
# Conectar ao banco
psql $DATABASE_URL

# Ver tabelas
\dt

# Ver usuários
SELECT * FROM "User";

# Ver eventos
SELECT * FROM "Event";

# Ver participantes
SELECT * FROM "EventAttendee";
```

---

## 🚨 Erros Comuns

### ❌ "EADDRINUSE: address already in use :::5000"

```powershell
# Porta 5000 já está em uso. Mude em .env:
PORT=5001
```

### ❌ "Error: ENOENT: no such file or directory, open '.env'"

```powershell
# Criar .env a partir do exemplo
Copy-Item .env.example .env
```

### ❌ "Can't reach database server"

```powershell
# 1. Se SQLite: deve funcionar automaticamente
# 2. Se PostgreSQL local: certifique que PostgreSQL está rodando
#    Windows: Services > PostgreSQL Server
#    Mac: brew services start postgresql
#    Linux: sudo service postgresql start

# 3. Se Supabase: verificar DATABASE_URL está correto
#    Testar: psql $DATABASE_URL
```

### ❌ "relation 'User' does not exist"

```powershell
# Migrations não foram rodadas
npx prisma migrate dev --name init
```

---

## 📊 Dados de Teste Inclusos

Quando você roda `npx ts-node src/seed.ts`, são criados:

### 5 Usuários

| Email | Senha | Nome |
|-------|-------|------|
| ana@melloz.com | password123 | Ana Silva |
| carlos@melloz.com | password123 | Carlos Santos |
| maria@melloz.com | password123 | Maria Costa |
| joão@melloz.com | password123 | João Oliveira |
| sophia@melloz.com | password123 | Sophia Martins |

### 5 Eventos

- **The Bass House** - Electronic/Reggae - São Paulo
- **Sunset Vibes** - Reggae - Rio de Janeiro
- **Underground Beats** - Electronic/Hip-Hop - Belo Horizonte
- **Tropical Paradise** - Reggae/Latin - Recife
- **Midnight Sessions** - Electronic/House - Brasília

---

## 🎯 Endpoints Disponíveis

### Auth (Autenticação)

```
POST   /api/auth/register          Criar conta
POST   /api/auth/login             Fazer login
GET    /api/auth/me                Ver perfil (precisa token)
PUT    /api/auth/profile           Atualizar perfil (precisa token)
```

### Events (Eventos)

```
GET    /api/events                 Listar eventos (com filtros)
GET    /api/events/:id             Detalhes do evento
GET    /api/events/trending        Eventos populares
POST   /api/events                 Criar evento (precisa token)
PUT    /api/events/:id             Atualizar evento (precisa token)
DELETE /api/events/:id             Deletar evento (precisa token)
POST   /api/events/:id/join        Entrar no evento (precisa token)
POST   /api/events/:id/leave       Sair do evento (precisa token)
```

---

## 🔑 Como Usar Token JWT

Após login, você recebe um token:

```bash
# Guardar o token da resposta:
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Usar em requisições subsequentes:
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📱 Testar com Postman

1. Baixe Postman: https://www.postman.com/downloads/
2. Importe a coleção (será criada)
3. Teste cada endpoint

**Dica:** Postman salva tokens automaticamente com variáveis de ambiente.

---

## 🌐 Conectar Frontend

No seu `App.tsx` do frontend:

```typescript
const API_URL = 'http://localhost:5000/api';

// Exemplo: Listar eventos
const response = await fetch(`${API_URL}/events`);
const events = await response.json();
```

Se tiver CORS error:

```typescript
// O backend já tem CORS habilitado!
// Mas se precisar ajustar, edite src/server.ts:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## 📚 Documentação Completa

Para saber mais:

- **Supabase Setup:** Ver `SUPABASE_SETUP.md`
- **Migração MongoDB:** Ver `MONGODB_TO_SUPABASE_MIGRATION.md`
- **Status Completo:** Ver `MIGRACAO_CONCLUIDA.md`

---

## ✅ Checklist Rápido

- [ ] Clonar/navegar para pasta backend
- [ ] `npm install`
- [ ] Criar `.env` (copiar `.env.example`)
- [ ] Escolher banco (SQLite, PostgreSQL local, ou Supabase)
- [ ] `npx prisma migrate dev --name init`
- [ ] `npx ts-node src/seed.ts`
- [ ] `npm run dev`
- [ ] Testar endpoint: `curl http://localhost:5000/api/events`
- [ ] ✅ PRONTO!

---

## 🎉 VOCÊ ESTÁ PRONTO!

Seu backend está rodando. Próximo passo:

1. ✅ Backend funcionando
2. ⏳ Conectar ao Frontend
3. ⏳ Fazer requests da UI
4. ⏳ Deploy em produção

**Vamos lá! 🚀**

---

**Tempo total:** 5 minutos ⏱️  
**Dificuldade:** ⭐ Fácil  
**Suporte:** Ver documentação dos passos acima
