# Hapnow

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

Plataforma de descoberta e criação de eventos locais — encontre "rolês" perto de você, veja o que seus amigos estão indo e crie seu próprio evento em minutos.

🔗 **[hapnow.com.br](https://hapnow.com.br)**

## Funcionalidades

- Descoberta de eventos por localização ("perto de mim")
- Criação de eventos com data, local e capa
- Lista de participantes e confirmação de presença
- Feed social: veja os eventos dos seus amigos
- Autenticação de usuários

## Stack

**Frontend:** React, TypeScript
**Backend:** Node.js, Express, TypeScript
**Banco de dados:** PostgreSQL (Supabase), Prisma ORM
**Autenticação:** JWT
**Deploy:** Vercel (frontend) / Railway (backend)

## Rodando localmente

Pré-requisitos: Node.js e uma instância do Supabase (ou PostgreSQL local).

```bash
# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

# Frontend (em outro terminal, na raiz do projeto)
npm install
npm run dev
```

Configure as variáveis de ambiente com base em `.env.example`.
