# 🎵 Melloz Backend - Documentação

## 📋 Visão Geral

Backend da plataforma Melloz - um aplicativo de descoberta de eventos noturnos. Desenvolvido com Node.js, Express e MongoDB.

---

## 🔧 Requisitos do Sistema

### Obrigatórios

| Requisito | Versão | Download |
|-----------|--------|----------|
| **Node.js** | 18.x ou superior | https://nodejs.org/ |
| **npm** | 9.x ou superior | Incluído com Node.js |
| **MongoDB** | 5.0 ou superior | https://www.mongodb.com/try/download/community |
| **Git** | Qualquer versão recente | https://git-scm.com/ |

### Opcionais

- **Postman** (para testar APIs) - https://www.postman.com/
- **MongoDB Compass** (GUI para MongoDB) - https://www.mongodb.com/products/compass
- **VS Code** (editor recomendado) - https://code.visualstudio.com/

---

## 📦 Dependências do Projeto

### Principais (`package.json`)

```json
{
  "express": "^4.18.2",           // Framework web
  "mongoose": "^8.0.3",           // ODM MongoDB
  "bcryptjs": "^2.4.3",           // Hash de senhas
  "jsonwebtoken": "^9.1.2",       // Autenticação JWT
  "dotenv": "^16.3.1",            // Variáveis de ambiente
  "cors": "^2.8.5",               // CORS middleware
  "validator": "^13.11.0"         // Validação de dados
}
```

### DevDependencies (desenvolvimento)

```json
{
  "typescript": "^5.3.3",
  "ts-node": "^10.9.2",
  "@types/express": "^4.17.21",
  "@types/node": "^20.10.5",
  "jest": "^29.7.0"
}
```

---

## 🚀 Instalação Passo a Passo

### 1️⃣ Pré-requisitos

Certifique-se de ter Node.js instalado:

```powershell
node --version    # v18.x.x ou superior
npm --version     # 9.x.x ou superior
```

### 2️⃣ Instalar MongoDB

**Opção A: MongoDB Community (Local)**
```powershell
# Windows - Download de https://www.mongodb.com/try/download/community
# Execute o instalador e siga as instruções
# Por padrão inicia em: mongodb://localhost:27017
```

**Opção B: MongoDB Atlas (Nuvem - Recomendado)**
1. Acesse https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster
4. Copie a string de conexão
5. Atualize `.env` com a URL

### 3️⃣ Configurar Backend

```powershell
# 1. Navegar para pasta backend
cd backend

# 2. Instalar dependências
npm install

# 3. Copiar arquivo de exemplo
Copy-Item .env.example .env

# 4. Editar .env com suas credenciais
notepad .env
```

### 4️⃣ Arquivos de Configuração

**`.env` (Exemplo de configuração)**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/melloz
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

---

## 🎯 Como Executar

### Desenvolvimento

```powershell
# Inicia servidor com auto-reload (watch mode)
npm run dev

# Output esperado:
# ╔════════════════════════════════════════╗
# ║   🎵 MELLOZ BACKEND INICIADO          ║
# ║   Servidor rodando em: http://localhost:5000
# ║   Ambiente: development
# ╚════════════════════════════════════════╝
```

### Build para Produção

```powershell
# Compilar TypeScript para JavaScript
npm run build

# Iniciar servidor produção
npm start
```

### Seed de Dados

```powershell
# Popular banco com dados de teste
npx ts-node src/seed.ts

# Cria 5 usuários e 5 eventos de teste
```

---

## 📡 Endpoints da API

### Base URL
```
http://localhost:5000/api
```

### 🔐 Autenticação

#### Registrar Novo Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}

Response (201):
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "avatar": "https://picsum.photos/100/100",
    "isPremium": false,
    "vibes": []
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}

Response (200):
{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Obter Perfil (Requer Autenticação)
```http
GET /auth/me
Authorization: Bearer {token}

Response (200):
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "avatar": "https://picsum.photos/100/100",
    "isPremium": false,
    "vibes": ["Eletrônico", "Barzinho"],
    "confirmedEventIds": ["e1", "e2"]
  }
}
```

#### Atualizar Perfil
```http
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João da Silva",
  "avatar": "https://new-avatar.com/image.jpg",
  "vibes": ["Agitado", "Underground"]
}

Response (200):
{
  "user": { ... }
}
```

---

### 📅 Eventos

#### Listar Eventos (com filtros)
```http
GET /events?date=today&vibe=Agitado&limit=10&page=1
```

#### Obter Evento por ID
```http
GET /events/{id}
```

#### Eventos em Alta (Trending)
```http
GET /events/trending?limit=4
```

#### Criar Evento (Requer Autenticação)
```http
POST /events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Techno Night",
  "description": "Noite de eletrônico com DJs convidados",
  "location": "Galpão 9, São Paulo",
  "startTime": "23:00",
  "date": "tomorrow",
  "image": "https://example.com/image.jpg",
  "vibe": "Eletrônico",
  "priceLevel": 2,
  "isAfterHours": false,
  "isOfficial": true
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Techno Night",
  "description": "...",
  "confirmedCount": 1,
  "attendees": ["507f1f77bcf86cd799439011"],
  "createdAt": "2024-01-22T10:30:00Z"
}
```

#### Entrar em um Evento
```http
POST /events/{id}/join
Authorization: Bearer {token}

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "confirmedCount": 143,
  "attendees": [...]
}
```

#### Sair de um Evento
```http
POST /events/{id}/leave
Authorization: Bearer {token}

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "confirmedCount": 142,
  "attendees": [...]
}
```

#### Editar Evento (Apenas criador)
```http
PUT /events/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Techno Night - Updated",
  "description": "..."
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Techno Night - Updated",
  ...
}
```

#### Deletar Evento (Apenas criador)
```http
DELETE /events/{id}
Authorization: Bearer {token}

Response (200):
{
  "message": "Evento deletado com sucesso"
}
```

---

## 🗄️ Estrutura do Banco de Dados

### Coleção: Users

```typescript
{
  _id: ObjectId,
  name: string,
  email: string (único),
  password: string (hashed),
  avatar: string (URL),
  isPremium: boolean,
  vibes: string[], // ['Calmo', 'Agitado', 'Eletrônico', 'Barzinho', 'Underground', 'After']
  confirmedEventIds: string[],
  createdAt: Date,
  updatedAt: Date
}
```

### Coleção: Events

```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  location: string,
  coordinates: {
    latitude: number,
    longitude: number
  },
  startTime: string, // HH:mm
  endTime: string,
  date: string, // 'today' | 'tomorrow' | 'weekend' | 'week' | 'custom'
  dateLabel: string,
  image: string (URL),
  vibe: string,
  priceLevel: number, // 1-4
  confirmedCount: number,
  friendsGoing: ObjectId[],
  isAfterHours: boolean,
  isOfficial: boolean,
  createdBy: ObjectId (ref: User),
  attendees: ObjectId[] (ref: User),
  maxAttendees: number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚠️ Variáveis de Ambiente Importantes

| Variável | Descrição | Padrão | Exemplo |
|----------|-----------|--------|---------|
| `MONGODB_URI` | String de conexão MongoDB | mongodb://localhost:27017/melloz | mongodb+srv://user:pass@cluster.mongodb.net/melloz |
| `PORT` | Porta do servidor | 5000 | 3000, 8080 |
| `NODE_ENV` | Ambiente | development | development, production, test |
| `JWT_SECRET` | Chave para assinar JWT | secret | your_very_secure_random_string |
| `JWT_EXPIRE` | Expiração do token | 7d | 24h, 30d |
| `FRONTEND_URL` | URL do frontend (CORS) | http://localhost:5173 | https://melloz.app |

---

## 🧪 Testando a API

### Com Postman

1. **Importar Coleção:**
   - File → Import
   - Colar dados do arquivo `postman-collection.json` (se fornecido)

2. **Configurar Variáveis de Ambiente:**
   - Environment → Manage Environments
   - Criar environment "melloz-dev"
   - Adicionar variáveis:
     - `baseUrl`: http://localhost:5000/api
     - `token`: (preenchido após login)

3. **Testar Endpoints:**
   - Começar com POST /auth/register
   - Usar token retornado nos headers das próximas requisições

### Com cURL

```powershell
# Registrar
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "João",
    "email": "joao@test.com",
    "password": "senha123"
  }'

# Listar eventos
curl -X GET "http://localhost:5000/api/events?date=today"
```

---

## 🚨 Troubleshooting

### Erro: "MongoDB connection failed"

```
❌ Solução:
1. Verificar se MongoDB está rodando:
   - Windows: Services → MongoDB Server → Status: Running
   - macOS: brew services list | grep mongodb
   - Linux: sudo systemctl status mongod

2. Verificar MONGODB_URI em .env
3. Testar conexão com MongoDB Compass
```

### Erro: "Port 5000 already in use"

```powershell
# Encontrar e matar processo
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Ou usar porta diferente em .env
PORT=5001
```

### Erro: "Invalid JWT"

```
❌ Solução:
1. Verificar se JWT_SECRET está correto em .env
2. Certificar que token é enviado no header:
   Authorization: Bearer {token}
3. Verificar se token não expirou (7 dias por padrão)
```

---

## 🔒 Segurança

### Implementações

- ✅ Hashing de senhas com bcryptjs
- ✅ JWT para autenticação stateless
- ✅ CORS habilitado apenas para frontend
- ✅ Validação de inputs com validator.js
- ✅ Rate limiting (a implementar)
- ✅ HTTPS recomendado em produção

### Checklist de Produção

- [ ] Mudar `JWT_SECRET` para string segura
- [ ] Ativar `NODE_ENV=production`
- [ ] Usar MongoDB Atlas (nuvem) em vez de local
- [ ] Implementar rate limiting
- [ ] Adicionar logging estruturado
- [ ] Configurar HTTPS/SSL
- [ ] Usar variáveis de ambiente secretas

---

## 📝 Próximos Passos (TODO)

- [ ] Integração com Google Maps
- [ ] Sistema de notificações em tempo real (WebSockets)
- [ ] Upload de imagens para AWS S3
- [ ] Sistema de pagamento (Stripe/PagSeguro)
- [ ] Testes automatizados (Jest)
- [ ] Deploy na nuvem (Heroku/Railway/Vercel)
- [ ] Documentação com Swagger/OpenAPI
- [ ] Rate limiting e throttling
- [ ] Sistema de logs centralizados

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar documentação acima
2. Consultar logs do servidor (`npm run dev`)
3. Testar endpoints com Postman

---

## 📄 Licença

Projeto desenvolvido para Melloz App.
