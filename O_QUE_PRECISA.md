
# 📋 O QUE VOCÊ VAI PRECISAR - RESUMO EXECUTIVO

## 🎯 ANTES DE COMEÇAR

Para fazer o backend Melloz funcionar, você precisa de **3 coisas principais**:

---

## 1️⃣ INSTALAR NODE.JS E NPM

### Por que?
- Node.js executa o servidor Express
- npm instala todas as dependências

### Como?
1. Acesse: https://nodejs.org/
2. Download a versão **LTS (18.x ou superior)**
3. Execute o instalador e siga as instruções padrão
4. Reinicie seu computador (recomendado)

### Verificar se funcionou
```powershell
node --version    # Deve retornar v18.x.x ou maior
npm --version     # Deve retornar 9.x.x ou maior
```

---

## 2️⃣ INSTALAR MONGODB

### Por que?
- Banco de dados para armazenar usuários e eventos

### Opção A: Instalação Local (Windows)

1. Download: https://www.mongodb.com/try/download/community
2. Execute o instalador
3. Selecione "Install MongoDB as a Service"
4. Use configurações padrão
5. Pronto! MongoDB estará rodando automaticamente

**Verificar:**
- Windows → Services → buscar "MongoDB" → deve estar "Running"

**Connection string para `.env`:**
```
MONGODB_URI=mongodb://localhost:27017/melloz
```

### Opção B: MongoDB Atlas (Nuvem) - RECOMENDADO

**Por que é melhor:**
- Não precisa instalar nada
- Acesso de qualquer lugar
- Backup automático
- Plano gratuito disponível

**Como:**
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster (M0 - gratuito)
4. Copie a connection string
5. Adicione ao arquivo `.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/melloz
```

---

## 3️⃣ INSTALAR DEPENDÊNCIAS DO BACKEND

### Executar apenas uma vez:

```powershell
# 1. Navegar para pasta backend
cd "c:\Users\Mauro filho\Downloads\melloz principal\backend"

# 2. Instalar dependências (vai baixar ~500MB)
npm install

# 3. Criar arquivo .env
Copy-Item .env.example .env

# 4. Editar .env com suas credenciais
notepad .env

# 5. (Opcional) Popular banco com dados de teste
npx ts-node src/seed.ts
```

---

## 🚀 PRONTO! AGORA SIM PODE RODAR

```powershell
npm run dev

# Resultado esperado:
# ╔════════════════════════════════════════╗
# ║   🎵 MELLOZ BACKEND INICIADO          ║
# ║   Servidor rodando em: http://localhost:5000
# ║   Ambiente: development
# ╚════════════════════════════════════════╝
```

---

## 📦 LISTA DE REQUISITOS COMPLETA

### Obrigatórios (3 coisas)
- [ ] **Node.js 18+** - Download: https://nodejs.org/
- [ ] **npm 9+** - Incluído com Node.js
- [ ] **MongoDB 5+** - Opção A ou B acima

### Muito Recomendado (2 coisas)
- [ ] **Postman** - Para testar APIs
  - Download: https://www.postman.com/
  - Usar para validar endpoints antes de integrar frontend

- [ ] **MongoDB Compass** - GUI para visualizar banco
  - Download: https://www.mongodb.com/products/compass
  - Útil para debugar dados

### Opcionais (mas úteis)
- [ ] **VS Code** - Editor de código
  - Download: https://code.visualstudio.com/
  - Plugin recomendado: "Thunder Client" para testar APIs

- [ ] **Git** - Para versionamento
  - Download: https://git-scm.com/

- [ ] **Docker** - Para facilitar deploy
  - Download: https://www.docker.com/

---

## 📊 DEPENDÊNCIAS NPM (Automático)

Quando você rodar `npm install`, estas bibliotecas serão instaladas automaticamente:

```
✅ express           Framework HTTP
✅ mongoose          Conexão com MongoDB
✅ bcryptjs          Criptografia de senhas
✅ jsonwebtoken      Autenticação JWT
✅ dotenv            Variáveis de ambiente
✅ cors              Controle de acesso
✅ validator         Validação de dados
✅ typescript        Linguagem
✅ @types/*          Type definitions
```

**Nenhuma ação necessária - npm cuida disso!**

---

## 🔐 ARQUIVO `.env` - O QUE COLOCAR

Após rodar `Copy-Item .env.example .env`, edite o arquivo e complete:

```env
# MONGODB (escolha uma das duas linhas)
MONGODB_URI=mongodb://localhost:27017/melloz
# OU
# MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/melloz

# SERVER (deixar assim)
PORT=5000
NODE_ENV=development

# JWT (mudar para string segura em produção)
JWT_SECRET=sua_chave_super_secreta_mudar_depois
JWT_EXPIRE=7d

# FRONTEND (manter assim)
FRONTEND_URL=http://localhost:5173

# OPCIONAL (deixar como está)
GOOGLE_MAPS_API_KEY=sua_chave_aqui_opcional
```

---

## 🛠️ TESTES RÁPIDOS

### Teste 1: Verificar se servidor está rodando
```powershell
# Terminal
npm run dev

# Outro terminal
curl http://localhost:5000/health

# Resultado esperado:
# {"status":"OK","timestamp":"2024-01-22T10:30:00.000Z"}
```

### Teste 2: Testar registro de usuário
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "name": "João",
    "email": "joao@teste.com",
    "password": "senha123"
  }'

# Resultado: Token JWT + dados do usuário
```

### Teste 3: Com Postman
1. Abrir Postman
2. Novo request → POST
3. URL: `http://localhost:5000/api/auth/register`
4. Body → raw → JSON
5. Colar:
```json
{
  "name": "Teste",
  "email": "teste@test.com",
  "password": "senha123"
}
```
6. Click "Send"

---

## 📚 DOCUMENTAÇÃO A LER

Depois que tudo estiver rodando, leia:

1. **backend/README.md** - Documentação completa dos endpoints
2. **REQUIREMENTS.md** - Requisitos detalhados
3. **ARCHITECTURE.md** - Como tudo funciona
4. **FRONTEND_INTEGRATION.md** - Como integrar com React

---

## 🆘 PROBLEMAS COMUNS

### "mongodb não encontrado"
```
Solução: Instalar MongoDB ou criar conta MongoDB Atlas
```

### "Port 5000 already in use"
```
Solução: Mudar PORT em .env para 5001
```

### "npm install não funciona"
```
Solução:
rm -r node_modules
npm cache clean --force
npm install
```

### "MONGODB_URI inválido"
```
Solução:
1. Verificar string de conexão
2. Whitelist seu IP no MongoDB Atlas
3. Testar com MongoDB Compass
```

---

## 📅 TIMELINE ESTIMADA

```
Instalar Node.js          5 min
Instalar MongoDB          5 min
npm install               3 min
Configurar .env           2 min
Testar endpoints          3 min
────────────────────────────────
TOTAL                     ~18 min

Depois: Integrar com frontend React
```

---

## ✅ CHECKLIST PRÉ-INÍCIO

Antes de rodar `npm run dev`, certifique-se que tem:

- [ ] Node.js instalado (`node --version`)
- [ ] npm funcionando (`npm --version`)
- [ ] MongoDB rodando (localmente ou Atlas)
- [ ] Pasta `backend` no projeto
- [ ] Arquivo `.env` criado e preenchido
- [ ] Rodou `npm install` com sucesso
- [ ] Sem erros no console

---

## 🚀 RESUMO FINAL

### O que você precisa fazer:

1. **Instalar Node.js** (download + executar)
2. **Instalar MongoDB** (local ou Atlas)
3. **Rodar `npm install`** (no folder backend)
4. **Criar `.env`** (copiar .env.example e editar)
5. **Rodar `npm run dev`** (iniciar servidor)

### Pronto!

Backend estará rodando em: `http://localhost:5000`

Documentação completa em: `backend/README.md`

---

## 📞 ONDE ENCONTRAR AJUDA

1. Arquivo: `backend/README.md` - Tem tudo explicado
2. Arquivo: `REQUIREMENTS.md` - Requisitos detalhados
3. Arquivo: `ARCHITECTURE.md` - Como funciona
4. Logs do servidor: `npm run dev` mostra erros em tempo real

---

**Pronto para começar? ✨**

Abra seu terminal e execute:
```powershell
cd backend
npm install
npm run dev
```

Divirta-se! 🎉
