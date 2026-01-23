# 🏗️ ARCHITECTURE - Melloz App

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React/Vite)                   │
│                     (Port: 5173 - localhost)                    │
│  App.tsx → Pages (Feed, MyEvents, Profile, etc)                │
│  Components (EventCard, Layout, Logo, etc)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTP/REST API Calls
                             │
    ┌────────────────────────┴────────────────────────────┐
    │                                                     │
    ▼                                                     ▼
┌────────────────────────────┐          ┌─────────────────────────┐
│   EXPRESS SERVER (Node.js) │          │   MONGODB DATABASE      │
│   (Port: 5000 - localhost) │◄────────►│   (Port: 27017)         │
│                            │          │   Collections:          │
│  Routes:                   │          │   - Users               │
│  - /api/auth              │          │   - Events              │
│  - /api/events            │          └─────────────────────────┘
│                            │
│  Controllers:              │
│  - AuthController          │
│  - EventController         │
│                            │
│  Services:                 │
│  - AuthService             │
│  - EventService            │
│                            │
│  Models:                   │
│  - User                    │
│  - Event                   │
│                            │
│  Middleware:               │
│  - authMiddleware (JWT)    │
│  - errorHandler            │
└────────────────────────────┘
```

---

## 📁 Estrutura de Pastas - Backend

```
backend/
├── src/
│   ├── config/              # ⚙️ Configurações
│   │   ├── database.ts      # Conexão MongoDB
│   │   └── index.ts         # Variáveis de ambiente
│   │
│   ├── models/              # 📊 Modelos Mongoose
│   │   ├── User.ts          # Schema de usuário
│   │   └── Event.ts         # Schema de evento
│   │
│   ├── controllers/         # 🎮 Lógica de rotas
│   │   ├── AuthController.ts    # Controlar auth
│   │   └── EventController.ts   # Controlar eventos
│   │
│   ├── services/            # 💼 Lógica de negócio
│   │   ├── AuthService.ts   # Serviços de auth
│   │   └── EventService.ts  # Serviços de eventos
│   │
│   ├── routes/              # 🛣️ Definição de rotas
│   │   ├── auth.ts          # Rotas de autenticação
│   │   └── events.ts        # Rotas de eventos
│   │
│   ├── middleware/          # 🔒 Middlewares
│   │   └── auth.ts          # JWT validation, error handler
│   │
│   ├── server.ts            # 🚀 Servidor principal
│   └── seed.ts              # 🌱 Popular banco com dados
│
├── dist/                    # 📦 Build compilado (gerado)
├── node_modules/            # 📚 Dependências (gerado)
├── .env                     # 🔐 Variáveis secretas
├── .env.example             # 📋 Exemplo de .env
├── .gitignore               # 🚫 Arquivos ignorados
├── package.json             # 📦 Dependências do projeto
├── tsconfig.json            # ⚙️ Config TypeScript
└── README.md                # 📖 Documentação
```

---

## 🔄 Fluxo de Dados

### 1. **Autenticação (Login)**

```
Frontend
   │
   ├─► POST /api/auth/login
   │   {email, password}
   │
   └─► Backend AuthController.login()
       │
       ├─► AuthService.login(email, password)
       │   │
       │   ├─► Procura usuário: User.findOne({email})
       │   │
       │   ├─► Valida senha: bcrypt.compare()
       │   │
       │   └─► Gera JWT: jwt.sign()
       │
       └─► Response: {user, token}
           │
           └─► Frontend salva token em localStorage
```

### 2. **Criar Evento**

```
Frontend (logado)
   │
   ├─► POST /api/events
   │   Headers: Authorization: Bearer {token}
   │   Body: {title, description, location, ...}
   │
   └─► Backend
       │
       ├─► authMiddleware valida token
       │
       ├─► EventController.createEvent()
       │   │
       │   ├─► EventService.createEvent()
       │   │   │
       │   │   ├─► Cria novo Event: new Event({...})
       │   │   │
       │   │   ├─► Define criador: createdBy = userId
       │   │   │
       │   │   ├─► Salva no banco: event.save()
       │   │   │
       │   │   ├─► Popula referências (populate)
       │   │   │
       │   │   └─► Retorna evento criado
       │   │
       │   └─► Response: {evento com dados completos}
       │
       └─► Frontend: evento aparece na Feed
```

### 3. **Entrar em um Evento**

```
Frontend
   │
   ├─► POST /api/events/{id}/join
   │   Headers: Authorization: Bearer {token}
   │
   └─► Backend EventService.joinEvent()
       │
       ├─► Encontra evento: Event.findById(id)
       │
       ├─► Adiciona usuário: event.attendees.push(userId)
       │
       ├─► Incrementa contagem: confirmedCount++
       │
       ├─► Salva: event.save()
       │
       └─► Response: evento atualizado
           │
           └─► Frontend: mostra confirmação
```

---

## 🔐 Sistema de Autenticação

### JWT (JSON Web Token)

```
┌─────────────────────────────────────────┐
│  ESTRUTURA DO JWT                       │
├─────────────────────────────────────────┤
│                                         │
│  Header.Payload.Signature              │
│                                         │
│  Header: {typ: "JWT", alg: "HS256"}   │
│  Payload: {userId: "...", exp: "..."}  │
│  Signature: HMACSHA256(                │
│    base64(header) + "." +              │
│    base64(payload),                    │
│    JWT_SECRET                          │
│  )                                      │
│                                         │
└─────────────────────────────────────────┘
```

### Flow do Token

```
1. Usuário faz login
   └─► Servidor gera JWT (válido por 7 dias)
       └─► Frontend recebe token

2. Toda requisição subsequente
   └─► Frontend envia: Authorization: Bearer {token}
       └─► authMiddleware valida a assinatura
           └─► Se válido: req.userId = userId
           └─► Se inválido: 401 Unauthorized

3. Token expira
   └─► Frontend deve fazer logout
       └─► Usuário faz login novamente
           └─► Novo token gerado
```

---

## 📊 Modelos de Dados

### User Schema

```typescript
{
  _id: ObjectId,              // ID único do MongoDB
  name: string,               // Nome completo
  email: string,              // Email único
  password: string,           // Hashed com bcrypt
  avatar: string,             // URL da imagem
  isPremium: boolean,         // Assinatura premium
  vibes: string[],           // ['Calmo', 'Agitado', 'Eletrônico', ...]
  confirmedEventIds: string[], // IDs de eventos confirmados
  createdAt: Date,            // Data de criação
  updatedAt: Date             // Última atualização
}
```

### Event Schema

```typescript
{
  _id: ObjectId,              // ID único
  title: string,              // Nome do evento
  description: string,        // Descrição
  location: string,           // Local
  coordinates: {              // GPS (opcional)
    latitude: number,
    longitude: number
  },
  startTime: string,          // HH:mm
  endTime: string,            // HH:mm (opcional)
  date: string,               // 'today' | 'tomorrow' | 'weekend' | ...
  dateLabel: string,          // 'Sexta, 14 Out'
  image: string,              // URL da imagem
  vibe: string,               // Categoria
  priceLevel: number,         // 1-4 ($, $$, $$$, $$$$)
  confirmedCount: number,     // Número de confirmados
  friendsGoing: ObjectId[],   // Referência para Users
  isAfterHours: boolean,      // É after hours?
  isOfficial: boolean,        // Evento oficial vs espontâneo
  createdBy: ObjectId,        // Referência para User
  attendees: ObjectId[],      // Referência para Users
  maxAttendees: number,       // Limite (opcional)
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Padrões de Design

### MVC (Model-View-Controller)

```
FRONTEND (View)
    ↓ (requisições)
CONTROLLER (recebe requisição)
    ↓ (delega lógica)
SERVICE (processa negócio)
    ↓ (consulta dados)
MODEL/DATABASE
    ↓ (retorna dados)
SERVICE (processa resposta)
    ↓ (envia resultado)
CONTROLLER (formata resposta)
    ↓ (JSON response)
FRONTEND (recebe e renderiza)
```

### Middleware Chain

```
Request
   ↓
express.json()
   ↓
cors()
   ↓
authMiddleware (se rota privada)
   ↓
Route Handler (Controller)
   ↓
Response
   ↓
errorHandler
```

---

## 🔄 Ciclo de Vida de uma Requisição

### Exemplo: Criar Evento

```
1. REQUEST CHEGA
   POST /api/events
   Authorization: Bearer eyJhbGci...
   {title: "Techno", location: "SP", ...}

2. MIDDLEWARE VALIDA
   ├─► express.json() faz parse do body
   ├─► cors() valida origin
   └─► authMiddleware extrai userId do token

3. CONTROLLER PROCESSA
   EventController.createEvent()
   ├─► Valida inputs
   └─► Chama service

4. SERVICE EXECUTA LÓGICA
   EventService.createEvent()
   ├─► Cria objeto Event
   ├─► Define createdBy = userId
   └─► Chama model para salvar

5. MODEL SALVA NO BANCO
   Event.create({...})
   ├─► MongoDB insere documento
   ├─► Mongoose valida schema
   └─► Retorna documento salvo

6. RESPONSE FORMATADO
   ├─► Popula referências (user, attendees)
   ├─► Converte para JSON
   └─► Envia para frontend

7. RESPONSE RECEBIDA
   Frontend recebe:
   {
     _id: "507f...",
     title: "Techno",
     createdBy: {name: "João", ...},
     ...
   }
```

---

## 🚀 Escalabilidade Futura

### Otimizações possíveis:

```
1. CACHING
   ├─► Redis para cache de eventos trending
   └─► Reduz queries ao MongoDB

2. WEBSOCKETS
   ├─► Socket.io para notificações em tempo real
   └─► Usuário vê quando alguém confirmou evento

3. MESSAGE QUEUE
   ├─► RabbitMQ/Bull para processamento assíncrono
   └─► Enviar emails em background

4. CDN
   ├─► CloudFlare/AWS CloudFront para imagens
   └─► Reduz latência globalmente

5. DATABASE SHARDING
   ├─► Dividir dados por região/data
   └─► Melhor performance em grande escala

6. MICROSERVIÇOS
   ├─► Separar em serviços: auth, events, payments
   └─► Escalabilidade independente
```

---

## 📊 Diagrama de Relações

```
┌──────────────┐                    ┌──────────────┐
│    USER      │                    │    EVENT     │
├──────────────┤                    ├──────────────┤
│ id (PK)      │                    │ id (PK)      │
│ name         │                    │ title        │
│ email        │◄──────────────────►│ createdBy(FK)│
│ password     │  1:N               │ location     │
│ avatar       │  (user pode criar  │ date         │
│ isPremium    │   múltiplos        │ vibe         │
│ vibes[]      │   eventos)         │ attendees[]  │
│              │                    │ (refs Users) │
│              │◄──────────────────►│              │
│              │  N:N               │              │
│              │  (user pode entrar │              │
│              │   múltiplos        │              │
│              │   eventos)         │              │
└──────────────┘                    └──────────────┘
```

---

## ⚠️ Considerações de Segurança

```
┌─────────────────────────────────────────────┐
│         CAMADAS DE SEGURANÇA                │
├─────────────────────────────────────────────┤
│                                             │
│  1. HTTPS (em produção)                    │
│     └─► Encripta comunicação cliente-server│
│                                             │
│  2. JWT SIGNATURE                          │
│     └─► Valida que token não foi alterado  │
│                                             │
│  3. BCRYPT HASHING                         │
│     └─► Senhas não são armazenadas em texto│
│                                             │
│  4. CORS WHITELIST                         │
│     └─► Apenas frontend autorizado        │
│                                             │
│  5. INPUT VALIDATION                       │
│     └─► Validator.js previne injeções     │
│                                             │
│  6. RATE LIMITING (TODO)                   │
│     └─► Limita requisições por IP          │
│                                             │
│  7. SQL INJECTION PREVENTION                │
│     └─► Mongoose faz sanitização automática│
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📈 Performance Considerations

```
┌────────────────────────────────────────┐
│  OTIMIZAÇÕES IMPLEMENTADAS             │
├────────────────────────────────────────┤
│                                        │
│  ✅ Índices no MongoDB                │
│     - date, vibe, location, createdBy │
│     - Queries mais rápidas             │
│                                        │
│  ✅ Paginação em getEvents()          │
│     - Retorna apenas 10 por padrão     │
│     - Reduz transferência de dados     │
│                                        │
│  ✅ Seleção de campos (select)         │
│     - Password não retornado por padrão│
│                                        │
│  ✅ Connection pooling                │
│     - Mongoose gerencia conexões       │
│                                        │
│  ❌ Cache (TODO)                      │
│     - Implementar Redis               │
│                                        │
│  ❌ Compression (TODO)                │
│     - Implementar gzip               │
│                                        │
└────────────────────────────────────────┘
```

---

**Última atualização:** 22 de janeiro de 2026
