// server.js
// Native ultra-fast Bun static server for offline local AI project

const DEFAULT_PORT = 8080;
const PORT = process.env.PORT || DEFAULT_PORT;

console.log(`Iniciando servidor Bun en puerto: ${PORT}`);

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;

    // Default route
    if (filePath === "/") {
      filePath = "/index.html";
    }

    // Resolve path relative to project root
    const absolutePath = `.${filePath}`;
    const file = Bun.file(absolutePath);

    // Verify file existence safely
    const exists = await file.exists();
    if (!exists) {
      console.warn(`Archivo no encontrado: ${filePath}`);
      return new Response("Not Found", { status: 404 });
    }

    // Serve file with correct MIME type detected automatically by Bun
    return new Response(file);
  },
  error(error) {
    console.error("Error en servidor Bun:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

console.log(`Servidor activo. URL local: http://localhost:${PORT}`);
