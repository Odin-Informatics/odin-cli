import { colors } from "../utils/logger";
import { freeDiskMB, majorVersion, systemInfo, toolVersion } from "../utils/system";

const MIN_NODE = 20;
const LOW_DISK_MB = 2048;

type Level = "ok" | "warn" | "fail";
const mark: Record<Level, string> = {
  ok: `${colors.green}✔${colors.reset}`,
  warn: `${colors.yellow}⚠${colors.reset}`,
  fail: `${colors.red}✖${colors.reset}`,
};

/** Checks the local development environment and returns the process exit code. */
export function runDoctor(cwd: string = process.cwd()): number {
  const info = systemInfo();
  const rows: [Level, string, string][] = [];

  rows.push(["ok", "İşletim sistemi", `${info.platform} ${info.release} (${info.architecture})`]);
  rows.push(["ok", "İşlemci / bellek", `${info.cpus} çekirdek, ${info.freeMemoryMB} / ${info.totalMemoryMB} MB boş`]);

  const nodeMajor = majorVersion(info.node);
  rows.push([nodeMajor >= MIN_NODE ? "ok" : "fail", "Node.js", `${info.node}${nodeMajor >= MIN_NODE ? "" : ` (en az ${MIN_NODE} gerekir)`}`]);

  for (const tool of ["npm", "git"]) {
    const v = toolVersion(tool);
    rows.push([v ? "ok" : "warn", tool, v ?? "bulunamadı"]);
  }

  const disk = freeDiskMB(cwd);
  if (disk === null) rows.push(["warn", "Disk", "okunamadı"]);
  else rows.push([disk < LOW_DISK_MB ? "warn" : "ok", "Disk (bu klasör)", `${(disk / 1024).toFixed(1)} GB boş`]);

  console.log(`\n${colors.bold}odin doctor${colors.reset} ${colors.dim}— yerel kontrol, ağ bağlantısı kurulmaz${colors.reset}\n`);
  for (const [level, label, value] of rows) console.log(`  ${mark[level]} ${label.padEnd(18)} ${value}`);

  const failed = rows.some(([l]) => l === "fail");
  console.log(failed ? `\n${mark.fail} Eksik var.` : `\n${mark.ok} Ortam hazır.`);
  return failed ? 1 : 0;
}
