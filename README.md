# Local IA

Local AI offline project built to run locally with high performance using Node and pnpm. This project provides an offline execution environment for AI web apps, avoiding external dependencies.

## 🚀 Características

- **Offline First**: Diseñado para ejecutarse completamente sin conexión.
- **Alto Rendimiento**: Servidor local sobre [Node.js](https://nodejs.org/), gestionado con [pnpm](https://pnpm.io/).
- **Despliegue Rápido**: Sin configuración compleja, listo para usar.

## 📋 Prerrequisitos

> **⚠️ IMPORTANTE - NAVEGADOR REQUERIDO:**
> Este proyecto **obligatoriamente** debe ejecutarse y probarse en el navegador **Google Chrome**. Otras alternativas (Firefox, Safari, etc.) no están soportadas por las APIs de IA local.

Además, este proyecto requiere **Node.js 20+** y **pnpm** instalados en tu sistema. A continuación, las instrucciones según tu sistema operativo.

### Windows

Instala Node.js desde [nodejs.org](https://nodejs.org/) (instalador LTS) y luego habilita pnpm desde PowerShell:

```powershell
corepack enable pnpm
```

_(Alternativa sin Corepack)_:

```powershell
npm install -g pnpm
```

### macOS (Intel / Apple Silicon)

Abre la terminal y ejecuta:

```bash
brew install node
corepack enable pnpm
```

### Linux (Debian, Ubuntu, Arch, etc.)

Instala Node.js con el gestor de paquetes de tu distribución (o con [nvm](https://github.com/nvm-sh/nvm)) y habilita pnpm:

```bash
corepack enable pnpm
```

> Si `corepack` no está disponible, instala pnpm con: `npm install -g pnpm`.

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/CharlyCeballos/local-IA-Chrome.git
   cd local-IA-Chrome
   ```

2. **Instalar dependencias:**
   _(Si existieran dependencias en el futuro, ejecuta esto. Actualmente el proyecto es ligero y autónomo)._

   ```bash
   pnpm install
   ```

3. **Ejecutar el servidor en modo desarrollo:**
   (Se reiniciará automáticamente si haces cambios en los archivos).

   ```bash
   pnpm dev
   ```

4. **Ejecutar en modo producción:**
   ```bash
   pnpm start
   ```

## 🌐 Acceso

Una vez iniciado, abre Chrome y visita:

```
http://localhost:41112
```

_(O el puerto que indique la terminal)_.

## 📁 Estructura del Proyecto

- `server.js`: Lógica del servidor web de alto rendimiento.
- `index.html`: Interfaz principal.
- `styles.css`: Estilos visuales.
- `main.js`: Lógica de la aplicación en el cliente.
- `package.json`: Configuración y scripts del proyecto.
