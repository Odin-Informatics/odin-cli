import * as os from "os";
import * as http from "http";
import * as https from "https";

export interface SystemMetrics {
  platform: string;
  architecture: string;
  cpus: number;
  totalMemoryMB: number;
  freeMemoryMB: number;
  uptimeHours: string;
}

export class Telemetry {
  static getMetrics(): SystemMetrics {
    const totalMem = Math.round(os.totalmem() / 1024 / 1024);
    const freeMem = Math.round(os.freemem() / 1024 / 1024);
    const uptime = (os.uptime() / 3600).toFixed(1);

    return {
      platform: os.platform(),
      architecture: os.arch(),
      cpus: os.cpus().length,
      totalMemoryMB: totalMem,
      freeMemoryMB: freeMem,
      uptimeHours: uptime,
    };
  }

  static async measureLatency(targetUrl: string = "https://odinbilisim.com"): Promise<number> {
    const start = Date.now();
    return new Promise((resolve) => {
      const client = targetUrl.startsWith("https") ? https : http;
      const req = client.get(targetUrl, (res) => {
        res.resume();
        resolve(Date.now() - start);
      });
      req.on("error", () => {
        resolve(-1);
      });
      req.setTimeout(3000, () => {
        req.destroy();
        resolve(-1);
      });
    });
  }
}
