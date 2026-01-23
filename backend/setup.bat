@echo off
REM Setup script para backend Melloz (Windows)

echo.
echo ╔════════════════════════════════════════╗
echo ║  🎵 MELLOZ BACKEND SETUP (Windows)    ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo 📋 Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não está instalado!
    echo 📥 Download: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js instalado: %NODE_VERSION%

REM Verificar npm
echo.
echo 📋 Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm não está instalado!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm instalado: %NPM_VERSION%

REM Instalar dependências
echo.
echo 📦 Instalando dependências...
call npm install
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)
echo ✅ Dependências instaladas

REM Criar .env se não existir
echo.
echo 🔐 Configurando variáveis de ambiente...
if not exist .env (
    copy .env.example .env
    echo ✅ Arquivo .env criado (preencher com suas credenciais)
    echo.
    echo 📝 Abrindo .env no editor...
    notepad .env
) else (
    echo ⚠️  Arquivo .env já existe
)

echo.
echo ╔════════════════════════════════════════╗
echo ║  ✅ SETUP CONCLUÍDO!                  ║
echo ╠════════════════════════════════════════╣
echo ║  Próximos passos:                     ║
echo ║  1. Verificar arquivo .env            ║
echo ║  2. npm run dev                       ║
echo ║  3. Testar em http://localhost:5000   ║
echo ╚════════════════════════════════════════╝
echo.
pause
