# GreenStamp Monorepo

GreenStamp is a developer-first API that converts raw activity data (energy usage, freight transport, materials, …) into CSRD-compliant CO₂e metrics and generates Digital Product Passports (DPP) in JSON-LD/XBRL.  The goal is to compress weeks of SME compliance work into minutes.

## 🗺️ Repository layout

```
.
├── greenstamp-api   # NestJS service that exposes the HTTP/JSON interface
└── README.md        # You’re reading it
```

Additional packages (CLI, infra, SDKs) will be added as the project matures.

## ✨ Features (MVP v0.1)

1. **Ingest**
   • `POST /activity/energy` – Store electricity / heat consumption in kWh  
   • `POST /activity/transport` – Store freight activity in tonne-kilometres (t-km)
2. **Calc** – Nightly EU emission-factor refresh (AWS Lambda, roadmap) and on-the-fly CO₂e calculation.
3. **Output**  
   • `GET /report/csrd` – Returns ESRS-E1 JSON snippet ready for XBRL tagging  
   • `POST /passport` – Returns Digital Product Passport JSON-LD plus a QR-code URL
4. **Auth & Docs** – API-key header (`x-api-key`) and live Swagger UI under `/docs`.

Out-of-scope for v0.1: advanced life-cycle assessments (water, land-use) and non-EU regulations (SEC, TCFD).

## 🚀 Quick-start

```bash
# Install Node 20+ and pnpm / npm

# 1. Install dependencies
cd greenstamp-api
npm install   # or pnpm install

# 2. Run in dev mode
npm run start:dev

# 3. Open docs
open http://localhost:3000/docs
```

> ℹ️ The default API key in development is `test-key`. Pass it via the `x-api-key` header.

## 🛤  Project milestones

| Week | Deliverable |
|------|-------------|
| 1–2  | Emission-factor sync + energy endpoint |
| 3–4  | Transport endpoint + ESRS renderer |
| 5    | DPP generator & QR hosting |
| 6    | Auth, logging, docs → private beta |

## 📏 Success metrics (v0.1)

• < 2 s median latency per call  
• ≥ 95 % correctness vs. official CO₂e factors (test set)  
• First five paying SME customers ≤ 3 months after beta

## 🛠  Tech stack

* **API** – NestJS (TypeScript) running on Node 20  
* **Data** – PostgreSQL (cloud)  
* **Batch** – AWS Lambda for nightly factor sync  
* **CI/CD** – GitHub Actions  
* **Utilities** – QR generation via `qrcode`

Python/FastAPI prototypes mentioned in early drafts were replaced with a TypeScript/NestJS implementation to align with the monorepo’s Node ecosystem.

---

Made with 🌱 by the GreenStamp team.
