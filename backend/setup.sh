#!/bin/bash
# Setup script para backend Melloz

echo "╔════════════════════════════════════════╗"
echo "║  🎵 MELLOZ BACKEND SETUP               ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Verificar Node.js
echo "📋 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "📥 Download: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "✅ Node.js instalado: $NODE_VERSION"

# Verificar npm
echo ""
echo "📋 Verificando npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado!"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo "✅ npm instalado: $NPM_VERSION"

# Navegar para backend
echo ""
echo "📁 Navegando para diretório backend..."
cd "$(dirname "$0")/backend" || exit
echo "✅ Diretório: $(pwd)"

# Instalar dependências
echo ""
echo "📦 Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi
echo "✅ Dependências instaladas"

# Criar .env se não existir
echo ""
echo "🔐 Configurando variáveis de ambiente..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Arquivo .env criado (preencher com suas credenciais)"
else
    echo "⚠️  Arquivo .env já existe"
fi

# Verificar MongoDB
echo ""
echo "🗄️  Verificando MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB não está instalado localmente"
    echo "    Opções:"
    echo "    1. Instalar: https://www.mongodb.com/try/download/community"
    echo "    2. Usar MongoDB Atlas (nuvem): https://www.mongodb.com/cloud/atlas"
    echo "    3. Usar Docker: docker run -d -p 27017:27017 mongo"
fi

# Oferecer rodar seed
echo ""
echo "🌱 Deseja popular o banco de dados com dados de teste? (s/n)"
read -r SEED_RESPONSE
if [ "$SEED_RESPONSE" = "s" ] || [ "$SEED_RESPONSE" = "S" ]; then
    echo "Rodando seed..."
    npx ts-node src/seed.ts
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  ✅ SETUP CONCLUÍDO!                  ║"
echo "╠════════════════════════════════════════╣"
echo "║  Próximos passos:                     ║"
echo "║  1. Verificar arquivo .env            ║"
echo "║  2. npm run dev                       ║"
echo "║  3. Testar em http://localhost:5000   ║"
echo "╚════════════════════════════════════════╝"
echo ""
