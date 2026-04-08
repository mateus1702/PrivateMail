/**
 * Run deploy-vm.sh with bash (Git Bash on Windows when WSL bash is unavailable).
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function toMsysPath(p) {
  const m = /^([a-zA-Z]):\\/i.exec(p);
  if (!m) return p.replace(/\\/g, "/");
  return `/${m[1].toLowerCase()}${p.slice(2).replace(/\\/g, "/")}`;
}

const gitBash = "C:\\Program Files\\Git\\bin\\bash.exe";
const bash =
  process.platform === "win32" && existsSync(gitBash) ? gitBash : "bash";

const deployScript = path.join(root, "scripts", "deploy-vm.sh");
const cmd = `cd "${toMsysPath(root)}" && bash "${toMsysPath(deployScript)}"`;

const r = spawnSync(bash, ["-lc", cmd], { stdio: "inherit", shell: false });
process.exit(r.status ?? 1);
