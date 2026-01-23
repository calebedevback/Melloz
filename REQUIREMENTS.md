# 📋 REQUIREMENTS - Melloz Backend

## 🎯 Resumo Executivo

Este documento lista **todos os requisitos** necessários para fazer o backend do Melloz funcionar completamente.

---

## 🔴 CRÍTICOS (Imprescindível)

### 1. **Node.js & npm**
- ✅ **Versão:** Node.js 18.x LTS ou superior
- ✅ **npm:** 9.x ou superior
- ✅ **Como verificar:**
  ```powershell
  node --version
  npm --version
  ```
- ✅ **Download:** https://nodejs.org/

### 2. **MongoDB**
- ✅ **Versão:** 5.0 ou superior
- ✅ **Opções:**
  - MongoDB Community (instalado localmente)
  - MongoDB Atlas (nuvem - RECOMENDADO)
  
#### Instalação MongoDB Community

**Windows:**
```powershell
# Download e execute instalador:
# https://www.mongodb.com/try/download/community
# Usar padrões de instalação
# MongoDB será instalado como serviço Windows

# Verificar:
mongod --version
```

**Conectar localmente:**
```
MONGODB_URI=mongodb://localhost:27017/melloz
```

#### Alternativa: MongoDB Atlas (Nuvem)

1. Criar conta: https://www.mongodb.com/cloud/atlas
2. Criar cluster gratuito (M0)
3. Obter connection string: `mongodb+srv://user:password@cluster.mongodb.net/melloz`
4. Adicionar ao `.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/melloz
```

---

## 🟡 ALTAMENTE RECOMENDADO

### 1. **MongoDB Compass** (GUI)
- Ferramenta visual para gerenciar MongoDB
- Download: https://www.mongodb.com/products/compass
- Útil para:
  - Ver coleções e documentos
  - Executar queries
  - Gerenciar índices
  - Debug de dados

### 2. **Postman** (Testador de APIs)
- Download: https://www.postman.com/download
- Uso:
  - Testar endpoints REST
  - Salvar coleções de requisições
  - Automatizar testes
  - Gerar documentação

### 3. **VS Code Extensions**
Recomendadas para melhor desenvolvimento:
```
- ES7+ React/Redux/React-Native snippets
- Thunder Client (testar APIs inline)
- MongoDB for VS Code
- TypeScript Vue Plugin
```

### 4. **Ferramentas de Terminal**
```powershell
# Git (para versionamento)
git --version
# Download: https://git-scm.com/

# PowerShell 5.1+ (já vem no Windows 10+)
# Recomendado: Windows Terminal
# Download: Microsoft Store
```

---

## 🟢 OPCIONAIS (Mas Úteis)

### 1. **Docker** (para containerização)
- Versão: Latest stable
- Uso: Facilita deploy e testes
- Download: https://www.docker.com/products/docker-desktop

### 2. **ngrok** (expor localhost)
- Uso: Testar webhook em ambiente local
- Download: https://ngrok.com/

### 3. **Insomnia** (alternativa ao Postman)
- Download: https://insomnia.rest/

---

## 📦 DEPENDÊNCIAS NPM

Automaticamente instaladas com `npm install`:

```json
{
  "express": "^4.18.2",           // Framework HTTP
  "mongoose": "^8.0.3",           // ODM MongoDB
  "bcryptjs": "^2.4.3",           // Hash de senhas
  "jsonwebtoken": "^9.1.2",       // JWT Auth
  "dotenv": "^16.3.1",            // Variáveis de ambiente
  "cors": "^2.8.5",               // CORS middleware
  "validator": "^13.11.0"         // Validação
}
```

---

## ⚙️ CONFIGURAÇÃO DE AMBIENTE

### Criar arquivo `.env` na pasta `backend/`:

```env
# ===== DATABASE =====
MONGODB_URI=mongodb://localhost:27017/melloz
# OU para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/melloz

# ===== SERVER =====
PORT=5000
NODE_ENV=development

# ===== JWT =====
JWT_SECRET=seu_secret_super_seguro_aqui_mudar_em_producao
JWT_EXPIRE=7d

# ===== CORS =====
FRONTEND_URL=http://localhost:5173

# ===== OPTIONAL =====
GOOGLE_MAPS_API_KEY=sua_chave_aqui_opcional
```

**⚠️ IMPORTANTE:**
- Nunca commitir `.env` no Git
- Arquivo `.gitignore` já inclui `.env`
- Mudar `JWT_SECRET` antes de ir para produção

---

## 🚀 PASSOS DE INSTALAÇÃO RÁPIDA

```powershell
# 1. Instalar Node.js (se ainda não tiver)
# Download de https://nodejs.org/

# 2. Instalar MongoDB (se não tiver na nuvem)
# Download de https://www.mongodb.com/try/download/community

# 3. Navegar para pasta backend
cd "c:\Users\Mauro filho\Downloads\melloz principal\backend"

# 4. Instalar dependências
npm install

# 5. Copiar arquivo de configuração
Copy-Item .env.example .env

# 6. Editar .env com suas credenciais
notepad .env

# 7. Popular banco de dados (opcional)
npx ts-node src/seed.ts

# 8. Iniciar servidor
npm run dev
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Antes de começar, certifique-se que tem:

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm 9+ instalado (`npm --version`)
- [ ] MongoDB instalado ou conta Atlas criada
- [ ] Arquivo `.env` criado e configurado
- [ ] Dependências instaladas (`npm install`)
- [ ] Pasta `backend/src` com todos os arquivos

### Verificar estrutura:
```powershell
ls backend/src/

# Deve retornar:
# - config/
# - controllers/
# - middleware/
# - models/
# - routes/
# - services/
# - server.ts
# - seed.ts
```

---

## 🧪 TESTE RÁPIDO

```powershell
# 1. Iniciar servidor
npm run dev

# 2. Em outro terminal, testar:
Invoke-WebRequest http://localhost:5000/health | Select-Object -ExpandProperty Content

# Resultado esperado:
# {"status":"OK","timestamp":"2024-01-22T10:30:00.000Z"}
```

---

## 🔗 INTEGRAÇÃO COM FRONTEND

O frontend (React/Vite) precisa estar configurado para se conectar ao backend:

**No arquivo `.env` do FRONTEND:**
```env
VITE_API_URL=http://localhost:5000/api
```

**No código React:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Exemplo de requisição
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

---

## 🌐 DEPLOY PARA PRODUÇÃO

### Plataformas recomendadas:

1. **Vercel** (https://vercel.com/)
   - Deploy automático do GitHub
   - Gratuito para hobby
   - Suporta Node.js/Express

2. **Railway** (https://railway.app/)
   - Suporta MongoDB integrado
   - UI simples
   - Opção gratuita

3. **Render** (https://render.com/)
   - Deploy automático
   - MongoDB integrado
   - Bom custo-benefício

4. **Heroku** (https://www.heroku.com/)
   - Tradicional
   - Paga
   - Muito estável

### Variáveis para Produção:
```env
NODE_ENV=production
JWT_SECRET=string_segura_aleatoria_minimo_32_caracteres
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/melloz
FRONTEND_URL=https://seu-frontend.com
```

---

## 📞 SUPORTE RÁPIDO

| Problema | Solução |
|----------|---------|
| MongoDB connection error | Verificar se MongoDB está rodando; checar MONGODB_URI em .env |
| Port 5000 already in use | Trocar PORT em .env ou matar processo: `Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess \| Stop-Process` |
| npm install failed | Deletar `node_modules` e `package-lock.json`, rodar `npm install` novamente |
| JWT token inválido | Regenerar token ou verificar JWT_SECRET |

---

## 📊 RECURSOS DE SISTEMA RECOMENDADOS

Para desenvolvimento local:

| Recurso | Mínimo | Recomendado |
|---------|--------|-------------|
| **RAM** | 4 GB | 8 GB |
| **Disco** | 500 MB | 2 GB (com node_modules) |
| **Processador** | Dual-core | Quad-core |
| **Internet** | 1 Mbps | 5+ Mbps (para download de packages) |

---

## 🎓 PRÓXIMOS PASSOS

1. ✅ Instalar requisitos (Node, MongoDB)
2. ✅ Clonar/setup do backend
3. ✅ Configurar arquivo `.env`
4. ✅ Rodar `npm install`
5. ✅ Popular dados com `npm run seed`
6. ✅ Testar APIs com Postman
7. ✅ Integrar com frontend React
8. ✅ Deploy em produção

---

**Última atualização:** 22 de janeiro de 2026
