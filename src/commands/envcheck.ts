import * as fs from "node:fs";

/** Keys defined in a dotenv file. Values are parsed only to tell "empty" from "set"; they are never returned. */
export function parseEnvKeys(text: string): Map<string, boolean> {
  const keys = new Map<string, boolean>();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if (!/^["']/.test(value)) value = value.replace(/(^|\s+)#.*$/, "").trim();
    value = value.replace(/^(["'])(.*)\1$/, "$2");
    keys.set(m[1], value.length > 0);
  }
  return keys;
}

export interface EnvReport {
  missing: string[];
  empty: string[];
  extra: string[];
}

/** Compare the keys of an env file with an example file. */
export function compareEnv(envText: string, exampleText: string): EnvReport {
  const env = parseEnvKeys(envText);
  const example = parseEnvKeys(exampleText);
  const missing = [...example.keys()].filter((k) => !env.has(k)).sort();
  const empty = [...env.entries()].filter(([k, set]) => example.has(k) && !set).map(([k]) => k).sort();
  const extra = [...env.keys()].filter((k) => !example.has(k)).sort();
  return { missing, empty, extra };
}

export function readIfExists(path: string): string | null {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch {
    return null;
  }
}
