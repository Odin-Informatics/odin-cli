#!/usr/bin/env node
// Launcher for the compiled CLI. Build first with `npm run build`.
try {
  require("../dist/index.js");
} catch (e) {
  if (e && e.code === "MODULE_NOT_FOUND" && String(e.message).includes("dist/index.js")) {
    console.error("odin: derlenmiş dosya yok. Önce `npm install && npm run build` çalıştırın.");
    process.exit(1);
  }
  throw e;
}
