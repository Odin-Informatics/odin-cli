# ⚡ Odin CLI (`@odin-informatics/cli`)

[![npm version](https://img.shields.io/badge/npm-v1.0.0-cb3837.svg?style=flat-square&logo=npm)](https://npmjs.com)
[![Node.js Version](https://img.shields.io/badge/node->=18.0.0-brightgreen.svg?style=flat-square&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg?style=flat-square)](LICENSE)
[![Organization](https://img.shields.io/badge/Odin-Informatics-0F172A?style=flat-square&logo=github)](https://github.com/Odin-Informatics)

**The Developer and Operations Command-Line Interface for Odin Informatics Cloud, AI, and Edge Systems.**

The `odin` CLI equips developers, system engineers, and DevOps teams with a unified command-line experience to manage enterprise infrastructure, query Odin AI models, perform environment health checks, and synchronize local POS hardware nodes with Odin Cloud.

---

## 🚀 Installation

### Global Installation via NPM

```bash
npm install -g @odin-informatics/cli
```

Or run directly without installation using `npx`:

```bash
npx @odin-informatics/cli --help
```

---

## 🛠️ Usage & Commands

```bash
odin [command] [options]
```

### 1. `odin status`
Check the health status of all Odin Cloud gateways, inference clusters, and POS endpoints:

```bash
odin status
```

**Output:**
```
⚡ Odin Infrastructure Health Check

  ● Odin AI Inference API   : ONLINE (Latency: 38ms)
  ● Odin POS Cloud Gateway   : ONLINE (100% operational)
  ● Odin Enterprise DB       : ONLINE (Cluster: tr-central-1)
  ● Security & Zero-Trust    : ENFORCED

All systems operational. (https://odinbilisim.com)
```

---

### 2. `odin ai <prompt>`
Query Odin AI models directly from your terminal:

```bash
odin ai "Mikroservis mimarisinde idempotency nasıl sağlanır?"
```

You can specify models using the `-m` flag:
```bash
odin ai "Generate a Docker Compose template" -m odin-v2-coder
```

---

### 3. `odin doctor`
Analyze and validate your local developer environment for prerequisites and connectivity:

```bash
odin doctor
```

---

### 4. `odin pos <action>`
Manage local edge POS hardware, printer diagnostics, and cloud catalog sync:

```bash
# Sync offline POS cache with cloud
odin pos sync

# Test peripheral hardware drivers
odin pos test
```

---

## 🤝 Development & Contribution

```bash
git clone https://github.com/Odin-Informatics/odin-cli.git
cd odin-cli
npm install
npm run build
npm start -- --help
```

---

## 📄 License

Distributed under the **Apache-2.0 License**. See [LICENSE](LICENSE) for details.

---

<div align="center">
<sub>Engineered with precision by <strong>Odin Informatics</strong> • <a href="https://www.odinbilisim.com">odinbilisim.com</a></sub>
</div>
