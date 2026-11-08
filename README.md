# odin-cli

[![CI](https://github.com/Odin-Informatics/odin-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/Odin-Informatics/odin-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

Odin Bilişim ekibinin projelerinde kullandığı küçük, **yerel** bir geliştirici yardımcı aracı.

> **Durum:** deneysel (0.x). npm'de yayınlanmadı; kaynaktan kurulur.
> Araç **hiçbir ağ bağlantısı kurmaz**, veri göndermez, API anahtarı saklamaz. Bütün komutlar yalnızca
> çalıştığı bilgisayarı ve verdiğiniz dosyaları okur.

## Kurulum

```bash
git clone https://github.com/Odin-Informatics/odin-cli.git
cd odin-cli
npm install
npm run build
npm link        # isteğe bağlı: `odin` komutunu her yerden çalıştırır
```

Node.js 20 veya üstü gerekir.

## Komutlar

### `odin doctor`

Geliştirme ortamını yerelde kontrol eder: Node.js sürümü, npm, git, işlemci, bellek ve bulunduğunuz
klasörün diskindeki boş alan. Node.js sürümü yetersizse çıkış kodu `1` olur.

```
odin doctor — yerel kontrol, ağ bağlantısı kurulmaz

  ✔ İşletim sistemi    linux 6.8.0 (x64)
  ✔ İşlemci / bellek   16 çekirdek, 22262 / 30987 MB boş
  ✔ Node.js            v22.11.0
  ✔ npm                10.9.0
  ✔ git                git version 2.43.0
  ✔ Disk (bu klasör)   23.6 GB boş

✔ Ortam hazır.
```

### `odin info [--json]`

Sistem bilgisini yazdırır. `--json` ile betiklerde kullanılabilir.

### `odin env-check [-e .env] [-x .env.example]`

Bir projenin `.env` dosyasını `.env.example` ile karşılaştırır:

- **eksik anahtarlar** — örnekte olup `.env`'de olmayanlar (çıkış kodu `1`)
- **boş değerli anahtarlar** — tanımlı ama değeri boş olanlar
- **fazla anahtarlar** — `.env`'de olup örnekte olmayanlar

Değerler hiçbir zaman ekrana yazdırılmaz; yalnızca anahtar adları raporlanır. CI'da dağıtım öncesi kontrol
olarak kullanılabilir:

```bash
odin env-check -e .env.production -x .env.example
```

## Geliştirme

```bash
npm install
npm test        # derler ve node:test ile testleri çalıştırır
```

## Lisans

[Apache-2.0](LICENSE) · [Odin Bilişim](https://www.odinbilisim.com), Tekirdağ.
