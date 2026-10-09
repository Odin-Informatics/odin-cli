#!/usr/bin/env node

/**
 * Odin Informatics CLI Launcher
 * (c) 2026 Odin Informatics. All rights reserved.
 */

try {
  // Prefer built JavaScript bundle if present, fallback to tsx/source
  require("../dist/index.js");
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND") {
    console.log("⚡ Compiling Odin CLI runtime...");
    require("child_process").execSync("npm run build", {
      cwd: require("path").resolve(__dirname, ".."),
      stdio: "inherit",
    });
    require("../dist/index.js");
  } else {
    throw e;
  }
}
