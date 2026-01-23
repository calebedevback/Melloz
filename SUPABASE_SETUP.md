# 🚀 SUPABASE - CONFIGURAÇÃO DO BANCO DE DADOS

## O que é Supabase?

**Supabase** é um backend open-source alternativo ao Firebase, baseado em **PostgreSQL**. Oferece:

- ✅ PostgreSQL gerenciado
- ✅ Autenticação integrada
- ✅ API REST automática
- ✅ Realtime com WebSockets
- ✅ Plano gratuito (500MB storage)
- ✅ Fácil de usar

---

## 📝 Instalação Passo a Passo

### 1. Criar Conta Supabase

1. Acesse: https://supabase.com
2. Clique em "Start Your Project"
3. Faça login com GitHub/Google
4. Crie uma nova organização

### 2. Criar Novo Projeto

1. Clique em "New Project"
2. Preencha:
   - **Project Name:** `melloz`
   - **Database Password:** Defina uma senha segura
   - **Region:** Escolha a mais próxima (ex: South America - São Paulo)
3. Clique em "Create new project"
4. Aguarde ~2 minutos para criação

### 3. Obter Connection String

1. Vá para **Settings** → **Database**
2. Copie a **Connection String** (URI do PostgreSQL)
3. Cole em seu arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

---

## 🔧 Configurar Prisma

### 1. Instalar Prisma

```powershell
cd backend
npm install @prisma/client prisma
```

### 2. Iniciar Prisma

```powershell
npx prisma init
```

Isso cria a pasta `prisma/` com `schema.prisma`

### 3. Configurar Prisma

Seu arquivo `prisma/schema.prisma` já foi criado com os modelos corretos!

### 4. Criar Banco de Dados (Migrations)

```powershell
# Criar migration inicial
npx prisma migrate dev --name init

# Isso vai:
# 1. Conectar ao Supabase
# 2. Criar as tabelas (Users, Events, EventAttendees)
# 3. Gerar cliente Prisma
```

### 5. Popular com Dados (Seed)

```powershell
npx ts-node src/seed.ts
```

---

## 📊 Tabelas Criadas Automaticamente

### 1. `users` (Usuários)
```sql
CREATE TABLE users (
  id STRING PRIMARY KEY,
  email STRING UNIQUE,
  password STRING,
  name STRING,
  avatar STRING,
  isPremium BOOLEAN DEFAULT false,
  vibes STRING[],
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)
```

### 2. `events` (Eventos)
```sql
CREATE TABLE events (
  id STRING PRIMARY KEY,
  title STRING,
  description STRING,
  location STRING,
  latitude FLOAT,
  longitude FLOAT,
  startTime STRING,
  endTime STRING,
  date STRING,
  dateLabel STRING,
  image STRING,
  vibe STRING,
  priceLevel INTEGER,
  confirmedCount INTEGER,
  isAfterHours BOOLEAN,
  isOfficial BOOLEAN,
  createdBy STRING (FK),
  friendsGoing STRING[],
  maxAttendees INTEGER,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)
```

### 3. `event_attendees` (Participantes)
```sql
CREATE TABLE event_attendees (
  id STRING PRIMARY KEY,
  eventId STRING (FK),
  userId STRING (FK),
  createdAt TIMESTAMP
)
```

---

## 🔐 Segurança

### Row Level Security (RLS)

Para adicionar segurança, você pode habilitar **RLS** no Supabase:

1. Vá para **Authentication** → **Policies**
2. Habilite RLS por tabela
3. Crie políticas para controlar acesso

Exemplo (no SQL Editor do Supabase):

```sql
-- Usuários só veem seus próprios dados
CREATE POLICY "Users can view own data" 
ON users 
FOR SELECT 
USING (auth.uid() = id);

-- Apenas criador pode editar/deletar evento
CREATE POLICY "Only creator can edit event" 
ON events 
FOR UPDATE 
USING (auth.uid() = createdBy);
```

---

## 📡 Conexão no Backend

O backend já está configurado! Basta:

1. **Instalar dependências:**
   ```powershell
   npm install
   ```

2. **Configurar `.env`:**
   ```env
   DATABASE_URL="postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=seu_secret_aqui
   ```

3. **Rodar migrations:**
   ```powershell
   npx prisma migrate dev --name init
   ```

4. **Popular dados:**
   ```powershell
   npx ts-node src/seed.ts
   ```

5. **Iniciar servidor:**
   ```powershell
   npm run dev
   ```

---

## 🎯 Usar Supabase Admin

### SQL Editor

Acesse **SQL Editor** no painel Supabase para:
- Executar queries SQL
- Ver dados das tabelas
- Fazer backups
- Executar migrações

### Table Editor

Acesse **Table Editor** para:
- Ver/editar dados visualmente
- Criar índices
- Gerenciar colunas

---

## 🔄 Migrações com Prisma

### Criar nova migration

```powershell
# Após alterar schema.prisma
npx prisma migrate dev --name nome_da_mudanca
```

### Ver histórico de migrations

```powershell
npx prisma migrate status
```

### Resetar banco (⚠️ APAGA TUDO)

```powershell
npx prisma migrate reset
```

---

## 📊 Studio Prisma

Visualizar dados graficamente:

```powershell
npx prisma studio
```

Abre em: http://localhost:5555

---

## 🆘 Troubleshooting

### Erro: "Can't reach database"

```
Solução:
1. Verificar DATABASE_URL em .env
2. Copiar URL exato do Supabase
3. Testar conexão com psql:
   psql "postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

### Erro: "relation 'users' does not exist"

```
Solução:
npx prisma migrate dev --name init
```

### Erro: "ForeignKeyViolationError"

```
Solução:
- Certifique-se que o usuário existe antes de referenciar
- Use include/select para popular relações
```

---

## 💡 Dicas Importantes

1. **Backup Automático:**
   - Supabase faz backup diário
   - Acesse em **Backups** no painel

2. **Performance:**
   - Use índices nas colunas frequentes
   - Já estão criados em: `date`, `vibe`, `location`, `createdBy`

3. **Monitoramento:**
   - Dashboard Supabase mostra queries lentas
   - Otimize conforme necessário

4. **API REST:**
   - Supabase gera API REST automaticamente
   - Mas estamos usando Prisma no backend (melhor)

---

## 📚 Recursos Úteis

- **Supabase Docs:** https://supabase.com/docs
- **Prisma Docs:** https://www.prisma.io/docs/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

## ✅ Checklist Final

- [ ] Conta Supabase criada
- [ ] Projeto criado no Supabase
- [ ] DATABASE_URL copiado para `.env`
- [ ] `npm install` executado
- [ ] Prisma migrations rodadas (`npx prisma migrate dev --name init`)
- [ ] Dados populados (`npx ts-node src/seed.ts`)
- [ ] Servidor rodando (`npm run dev`)
- [ ] API testada em http://localhost:5000/health

---

**Status:** ✅ Backend com Supabase PostgreSQL Configurado!
