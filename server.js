// server.js
// Minimal Node static server for the offline local AI project

import { spawn } from "node:child_process";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const PORT = 41112;
const ROOT = import.meta.dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".wasm": "application/wasm",
};

console.log(`Iniciando servidor Node en puerto: ${PORT}`);

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
  const requestedPath = decodeURIComponent(pathname === "/" ? "/index.html" : pathname);
  const absolutePath = resolve(ROOT, `.${requestedPath}`);

  // Keep every served file inside the project root
  if (!absolutePath.startsWith(ROOT + sep)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  const stats = await stat(absolutePath).catch(() => null);
  if (!stats?.isFile()) {
    console.warn(`Archivo no encontrado: ${requestedPath}`);
    res.writeHead(404).end("Not Found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(absolutePath)] ?? "application/octet-stream",
    "Content-Length": stats.size,
  });
  createReadStream(absolutePath)
    .on("error", (error) => {
      console.error("Error en servidor Node:", error);
      res.destroy();
    })
    .pipe(res);
}).listen(PORT, () => {
  console.log(`Servidor activo. URL local: http://localhost:${PORT}`);

  if (!process.argv.includes("--open")) return;
  spawn(
    "google-chrome",
    ["--optimization-guide-performance-class=6", `http://localhost:${PORT}`],
    { stdio: "ignore", detached: true }
  ).unref();
});
