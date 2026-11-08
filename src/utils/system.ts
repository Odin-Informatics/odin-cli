import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";

export interface SystemInfo {
  platform: string;
  release: string;
  architecture: string;
  cpus: number;
  totalMemoryMB: number;
  freeMemoryMB: number;
  uptimeHours: number;
  node: string;
}

/** Local machine facts only. Nothing is sent anywhere. */
export function systemInfo(): SystemInfo {
  return {
    platform: os.platform(),
    release: os.release(),
    architecture: os.arch(),
    cpus: os.cpus().length,
    totalMemoryMB: Math.round(os.totalmem() / 1024 / 1024),
    freeMemoryMB: Math.round(os.freemem() / 1024 / 1024),
    uptimeHours: Math.round((os.uptime() / 3600) * 10) / 10,
    node: process.version,
  };
}

/** Version string printed by `<cmd> --version`, or null when the tool is not installed. */
export function toolVersion(cmd: string): string | null {
  const res = spawnSync(cmd, ["--version"], { encoding: "utf-8", shell: process.platform === "win32", timeout: 5000 });
  if (res.status !== 0 || !res.stdout) return null;
  return res.stdout.trim().split("\n")[0];
}

/** Free disk space (MB) on the volume that holds `dir`, or null if it cannot be read. */
export function freeDiskMB(dir: string): number | null {
  try {
    const s = fs.statfsSync(dir);
    return Math.round((s.bavail * s.bsize) / 1024 / 1024);
  } catch {
    return null;
  }
}

/** Major version of a "v20.11.1"-style string. */
export function majorVersion(v: string): number {
  const m = /^v?(\d+)/.exec(v);
  return m ? Number(m[1]) : 0;
}
