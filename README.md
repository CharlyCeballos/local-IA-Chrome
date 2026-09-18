# Local IA

Local AI offline project built to run locally with high performance using Node and pnpm. This project provides an offline execution environment for AI web apps, avoiding external dependencies.

## 🚀 Características

- **Offline First**: Diseñado para ejecutarse completamente sin conexión.
- **Alto Rendimiento**: Servidor local sobre [Node.js](https://nodejs.org/), gestionado con [pnpm](https://pnpm.io/).
- **Despliegue Rápido**: Sin configuración compleja, listo para usar.

## 📋 Prerrequisitos

> **⚠️ IMPORTANTE - NAVEGADOR REQUERIDO:**
> Este proyecto **obligatoriamente** debe ejecutarse y probarse en **Google Chrome 138+**. Otras alternativas (Firefox, Safari, etc.) no están soportadas por las APIs de IA local.

### Modelo local (Gemini Nano)

La app usa la Prompt API (`LanguageModel`), que corre un modelo **en tu equipo**. Chrome clasifica el hardware en una *performance class* y solo habilita el modelo a partir de cierto nivel; las gráficas integradas suelen quedar en `VeryLow` y quedan excluidas. También necesita **22 GB libres** de disco y una descarga inicial de varios GB.

Activación:

1. `chrome://flags/#prompt-api` → **Enabled Multilingual** (obligatorio para respuestas en español; `Enabled` a secas solo garantiza inglés).
2. _(Opcional)_ `chrome://flags/#gemma4-for-built-in-ai` → **Enabled**.
3. Reinicia Chrome por completo.
4. `chrome://on-device-internals` → revisa la performance class y el estado del modelo. Ahí se ve si Chrome está descargando o si descartó el equipo.

Diagnóstico desde la consola de DevTools:

```js
await LanguageModel.availability();
```

`available` (listo), `downloadable` / `downloading` (descargando) son estados correctos. Si devuelve `unavailable` y la consola muestra *"The model was available but there was not an execution config available for the feature"*, Chrome descartó el equipo por performance class.

Como último recurso en equipos no soportados, se puede forzar la clase al arrancar Chrome:

```bash
google-chrome --optimization-guide-performance-class=6
```

Esto salta el filtro, no mejora el hardware: en equipos por debajo del mínimo el modelo puede ir muy lento o crashear el servicio.

`pnpm start` ya lanza Chrome con ese flag, así que normalmente no hace falta escribirlo a mano.

### Node.js y pnpm

Este proyecto requiere **Node.js 20+** y **pnpm** instalados en tu sistema. A continuación, las instrucciones según tu sistema operativo.

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
   (Levanta el servidor y abre Chrome en `http://localhost:41112` con `--optimization-guide-performance-class=6`).

   ```bash
   pnpm start
   ```

   > Cierra Chrome por completo antes de ejecutarlo: si ya hay una ventana abierta, la instancia existente solo abre la pestaña y **ignora** el flag.

## 🌐 Acceso

`pnpm start` abre la pestaña por ti. Con `pnpm dev` (o si cierras la ventana), abre Chrome y visita:

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
