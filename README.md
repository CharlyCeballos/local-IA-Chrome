# Local IA

Local AI offline project built to run locally with high performance using Bun. This project provides an offline execution environment for AI web apps, avoiding external dependencies.

## 🚀 Características

- **Offline First**: Diseñado para ejecutarse completamente sin conexión.
- **Alto Rendimiento**: Servidor local impulsado por [Bun](https://bun.sh/).
- **Despliegue Rápido**: Sin configuración compleja, listo para usar.

## 📋 Prerrequisitos

> **⚠️ IMPORTANTE - NAVEGADOR REQUERIDO:**
> Este proyecto **obligatoriamente** debe ejecutarse y probarse en el navegador **Google Chrome**. Otras alternativas (Firefox, Safari, etc.) no están soportadas por las APIs de IA local.

Además, este proyecto requiere **Bun** instalado en tu sistema. A continuación, las instrucciones según tu sistema operativo.

### Windows

Actualmente, Bun en Windows requiere **WSL** (Windows Subsystem for Linux) o utilizar la versión experimental nativa.

**Opción A (Recomendado con WSL - Ubuntu/Debian):**
Abre tu terminal WSL y ejecuta:

```bash
curl -fsSL https://bun.sh/install | bash
```

**Opción B (Windows Nativo - Experimental):**
Abre PowerShell y ejecuta:

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### macOS (Intel / Apple Silicon)

Abre la terminal y ejecuta:

```bash
curl -fsSL https://bun.sh/install | bash
```

_(Alternativa usando Homebrew)_:

```bash
brew tap oven-sh/bun
brew install bun
```

### Linux (Debian, Ubuntu, Arch, etc.)

Abre tu terminal y ejecuta:

```bash
curl -fsSL https://bun.sh/install | bash
```

> Asegúrate de tener `curl` y `unzip` instalados: `sudo apt install curl unzip` (Debian/Ubuntu).

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/CharlyCeballos/local-IA-Chrome.git
   cd local-IA-Chrome
   ```

2. **Instalar dependencias:**
   _(Si existieran dependencias en el futuro, ejecuta esto. Actualmente el proyecto es ligero y autónomo)._

   ```bash
   bun install
   ```

3. **Ejecutar el servidor en modo desarrollo:**
   (Se reiniciará automáticamente si haces cambios en los archivos).

   ```bash
   bun run dev
   ```

4. **Ejecutar en modo producción:**
   ```bash
   bun run start
   ```

## 🌐 Acceso

Una vez iniciado, abre Chrome y visita:

```
http://localhost:3000
```

_(O el puerto que indique la terminal)_.

## 📁 Estructura del Proyecto

- `server.js`: Lógica del servidor web de alto rendimiento.
- `index.html`: Interfaz principal.
- `styles.css`: Estilos visuales.
- `main.js`: Lógica de la aplicación en el cliente.
- `package.json`: Configuración y scripts del proyecto.
