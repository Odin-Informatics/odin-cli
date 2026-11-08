import { Command } from "commander";
import { runDoctor } from "./commands/doctor";
import { compareEnv, readIfExists } from "./commands/envcheck";
import { Logger, colors } from "./utils/logger";
import { systemInfo } from "./utils/system";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require("../package.json") as { version: string };

const program = new Command();

program
  .name("odin")
  .description("Odin Bilişim'in yerel geliştirici yardımcı aracı (deneysel). Ağ bağlantısı kurmaz, veri göndermez.")
  .version(version);

program
  .command("doctor")
  .description("Node.js, npm, git, bellek ve disk alanını yerelde kontrol eder")
  .action(() => {
    process.exitCode = runDoctor();
  });

program
  .command("info")
  .description("Bu bilgisayarın sistem bilgisini gösterir")
  .option("--json", "JSON olarak yazdır")
  .action((opts: { json?: boolean }) => {
    const info = systemInfo();
    if (opts.json) {
      console.log(JSON.stringify(info, null, 2));
      return;
    }
    for (const [k, v] of Object.entries(info)) console.log(`  ${colors.dim}${k.padEnd(14)}${colors.reset} ${v}`);
  });

program
  .command("env-check")
  .description(".env dosyasını .env.example ile karşılaştırır; değerleri asla yazdırmaz")
  .option("-e, --env <path>", "ortam dosyası", ".env")
  .option("-x, --example <path>", "örnek dosya", ".env.example")
  .action((opts: { env: string; example: string }) => {
    const example = readIfExists(opts.example);
    if (example === null) {
      Logger.error(`${opts.example} bulunamadı.`);
      process.exitCode = 2;
      return;
    }
    const env = readIfExists(opts.env);
    if (env === null) {
      Logger.error(`${opts.env} bulunamadı.`);
      process.exitCode = 2;
      return;
    }
    const r = compareEnv(env, example);
    if (r.missing.length) Logger.error(`Eksik anahtarlar (${r.missing.length}): ${r.missing.join(", ")}`);
    if (r.empty.length) Logger.warn(`Boş değerli anahtarlar (${r.empty.length}): ${r.empty.join(", ")}`);
    if (r.extra.length) Logger.info(`Örnekte olmayan anahtarlar (${r.extra.length}): ${r.extra.join(", ")}`);
    if (!r.missing.length && !r.empty.length) Logger.success(`${opts.env}, ${opts.example} ile uyumlu.`);
    process.exitCode = r.missing.length ? 1 : 0;
  });

program.parse(process.argv);
