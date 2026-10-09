/**
 * ANSI-enhanced logging utility for Odin CLI.
 */

export const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
};

export class Logger {
  static info(msg: string): void {
    console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`);
  }

  static success(msg: string): void {
    console.log(`${colors.green}✔${colors.reset} ${msg}`);
  }

  static warn(msg: string): void {
    console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
  }

  static error(msg: string): void {
    console.error(`${colors.red}✖${colors.reset} ${colors.bold}${msg}${colors.reset}`);
  }

  static badge(tag: string, text: string): void {
    console.log(
      `${colors.bgRed}${colors.white}${colors.bold} ${tag} ${colors.reset} ${text}`
    );
  }
}
