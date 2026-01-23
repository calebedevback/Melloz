# 🔐 CREDENCIAIS SUPABASE - Referência

## ✅ Projeto Criado

**URL Principal:** https://wyimsniotcdjpicgozfl.supabase.co

---

## 🔑 Chaves de Acesso

### 1. Anon Key (Para o Frontend)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aW1zbmlvdGNkanBpY2dvemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjcyNjgsImV4cCI6MjA4NDcwMzI2OH0.EiulkLUi2_IUz4BKyZbqyXxRZpD-S_-lpH4pApLgvhs
```

**Uso:** Requisições públicas do frontend  
**Validação:** Até 2084-07-03

---

### 2. Service Role Key (Para o Backend)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aW1zbmlvdGNkanBpY2dvemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjcyNjgsImV4cCI6MjA4NDcwMzI2OH0.EiulkLUi2_IUz4BKyZbqyXxRZpD-S_-lpH4pApLgvhs
```

**Uso:** Backend (admin access)  
**Cuidado:** ⚠️ NÃO exponha no frontend!  
**Validação:** Até 2084-07-03

---

## 🗄️ Banco de Dados - PostgreSQL

### Session Pooler (Recomendado para Apps)

```
Host:     aws-0-us-west-2.pooler.supabase.com
Port:     5432
Database: postgres
User:     postgres.wyimsniotcdjpicgozfl
Password: [Veja em .env]
Pool Mode: session
```

### Connection String (Session Pooler)
```
postgresql://postgres.wyimsniotcdjpicgozfl:PASSWORD@aws-0-us-west-2.pooler.supabase.com:5432/postgres
```

---

## 📊 Detalhes Técnicos

| Configuração | Valor |
|-------------|-------|
| **Provider** | Supabase PostgreSQL |
| **Region** | US-West-2 (aws-0) |
| **Database** | postgres |
| **Version** | PostgreSQL 15+ |
| **Pooling** | Session mode |
| **SSL** | Habilitado |

---

## ✅ Próximas Ações

### 1. Arquivo `.env` está criado
```
✅ Arquivo: backend/.env
✅ DATABASE_URL: Configurado
✅ SUPABASE_URL: Configurado
✅ Chaves: Adicionadas
```

### 2. Rodar Migrations
```powershell
cd backend
npx prisma migrate dev --name init
```

### 3. Ver Banco no Supabase Dashboard
1. Acesse: https://app.supabase.com
2. Login com sua conta
3. Vá para: SQL Editor
4. Execute queries

### 4. Ver Dados com Prisma Studio
```powershell
npx prisma studio
```

---

## 🚀 Testando Conexão

### Via Prisma
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Test connection
const users = await prisma.user.findMany();
console.log('✅ Conectado!', users);
```

### Via psql (SQL)
```bash
psql postgresql://postgres.wyimsniotcdjpicgozfl:PASSWORD@aws-0-us-west-2.pooler.supabase.com:5432/postgres

\dt                    # Ver tabelas
SELECT * FROM users;   # Ver usuários
```

---

## 📋 Tabelas Criadas Automaticamente

Após rodar `npx prisma migrate dev --name init`:

- ✅ `users` - Usuários do app
- ✅ `events` - Eventos noturnos
- ✅ `event_attendees` - Participantes de eventos
- ✅ Índices em: date, vibe, location, createdBy
- ✅ Foreign keys com cascade delete

---

## 🔒 Segurança

### ✅ Habilitado
- [x] SSL/TLS obrigatório
- [x] Conexão pooling segura
- [x] Session mode (melhor para web apps)
- [x] Validação de JWT no Prisma

### ⚠️ Importante
- Nunca compartilhe o Service Role Key
- Use apenas Anon Key no frontend
- Backend usa DATABASE_URL (super seguro)
- Rotate keys a cada 3-6 meses em produção

---

## 🎯 Status

```
✅ Supabase Criado
✅ PostgreSQL Configurado
✅ Session Pooler Ativo
✅ Chaves Geradas
✅ .env Pronto
⏳ Migrations Prontas (execute!)
⏳ Backend Conectado
```

---

## 📚 Próximas Leituras

1. **QUICK_START.md** - Como rodar
2. **SUPABASE_SETUP.md** - Detalhes
3. **backend/README_NOVO.md** - API docs

---

## 💡 Dica de Ouro

Se receber erro de conexão:

```powershell
# 1. Verificar .env
cat .env

# 2. Testar conexão
psql $DATABASE_URL -c "SELECT version();"

# 3. Se erro SSL
# Adicionar em .env:
DATABASE_URL="postgresql://...?sslmode=require"
```

---

**Credenciais Criadas:** 22 de Janeiro de 2026  
**Status:** ✅ Prontas para usar  
**Próximo:** Rodar migrations!
