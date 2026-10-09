import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export interface OdinConfig {
  apiKey?: string;
  apiUrl?: string;
  defaultModel?: string;
  organization?: string;
}

const CONFIG_DIR = path.join(os.homedir(), ".config", "odin");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export class ConfigManager {
  static load(): OdinConfig {
    try {
      if (!fs.existsSync(CONFIG_FILE)) {
        return {
          apiUrl: "https://api.odinbilisim.com/v1",
          defaultModel: "odin-v2-chat",
        };
      }
      const data = fs.readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      return {
        apiUrl: "https://api.odinbilisim.com/v1",
        defaultModel: "odin-v2-chat",
      };
    }
  }

  static save(config: Partial<OdinConfig>): void {
    try {
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
      }
      const current = this.load();
      const updated = { ...current, ...config };
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to persist Odin configuration:", err);
    }
  }
}
