# GreenStamp API - Carbon Footprint & Digital Product Passport

A developer-first API that converts raw activity data into CSRD-compliant CO₂e metrics and generates Digital Product Passports (DPP) in JSON-LD/XBRL format.

## 🎯 Purpose

GreenStamp reduces SME compliance work from weeks to minutes by providing:
- **Carbon Footprint Calculation**: Convert energy, freight, and materials data into CSRD-compliant CO₂e metrics
- **Digital Product Passports**: Generate machine-readable DPP in JSON-LD/XBRL format
- **Audit-Ready Reports**: ESRS-compliant reporting for sustainability analysts and auditors

## 👥 Primary Users

- **Sustainability analysts** inside SMEs
- **Carbon-accounting / ERP vendors** that need a backend
- **Auditors** who must ingest machine-readable CSRD blocks

## 🚀 MVP Features

### Core Functionality
- **Activity Ingestion**: POST endpoints for energy (kWh) and transport (t-km) data
- **Automatic Calculation**: EU emission-factor tables with nightly sync
- **CSRD Reporting**: GET endpoint for ESRS-E1 compliant reports
- **DPP Generation**: POST endpoint for Digital Product Passport with QR codes
- **Authentication**: API-key based access control
- **Documentation**: Interactive Swagger/OpenAPI documentation

### API Endpoints

#### Activity Data Ingestion
- `POST /activity/energy` - Submit energy consumption data (kWh)
- `POST /activity/transport` - Submit transport data (t-km)

#### Reporting & Passports
- `GET /report/csrd` - Generate CSRD-compliant ESRS-E1 report
- `POST /passport` - Create Digital Product Passport (JSON-LD + QR URL)

#### Authentication
- `POST /auth/register` - Register for API access
- `POST /auth/login` - Authenticate and get API key

## 🏗️ Architecture

### Tech Stack
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT with API keys
- **Documentation**: Swagger/OpenAPI
- **QR Generation**: qrcode library
- **Testing**: Jest
- **CI/CD**: GitHub Actions

### Project Structure
```
greenstamp-api/
├── src/
│   ├── modules/
│   │   ├── activity/          # Activity data ingestion
│   │   ├── auth/             # Authentication & authorization
│   │   ├── calculation/      # CO₂e calculation engine
│   │   ├── passport/         # DPP generation
│   │   └── reporting/        # CSRD report generation
│   ├── common/
│   │   ├── dto/             # Data transfer objects
│   │   ├── entities/        # Database entities
│   │   ├── guards/          # Authentication guards
│   │   └── interceptors/    # Request/response interceptors
│   └── config/              # Configuration management
├── test/                    # Test files
├── docs/                    # API documentation
└── docker/                  # Docker configuration
```

### Monorepo Structure
```
/
├── README.md                 # Main project documentation
├── LICENSE                   # Project license
└── greenstamp-api/          # NestJS API implementation
    ├── src/                 # Source code
    ├── package.json         # Dependencies and scripts
    ├── docker-compose.yml   # Development environment
    ├── Dockerfile           # Production container
    └── README.md            # API-specific documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greenstamp-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   npm run migration:run
   
   # Seed initial data (emission factors)
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

### Docker Setup (Alternative)

```bash
# Navigate to API directory
cd greenstamp-api

# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f api
```



## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3000/api`
- **OpenAPI JSON**: `http://localhost:3000/api-json`

### Example Usage

#### Submit Energy Data
```bash
curl -X POST http://localhost:3000/activity/energy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "kwh": 1000,
    "energy_type": "electricity",
    "region": "EU",
    "timestamp": "2024-01-15T10:00:00Z"
  }'
```

#### Generate CSRD Report
```bash
curl -X GET http://localhost:3000/report/csrd \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

#### Create Digital Product Passport
```bash
curl -X POST http://localhost:3000/passport \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "product_id": "PROD-001",
    "product_name": "Eco-Friendly Widget",
    "manufacturer": "GreenCorp",
    "materials": ["recycled_plastic", "organic_cotton"],
    "carbon_footprint": 2.5
  }'
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 📊 Success Metrics

- **Performance**: <2s median latency per API call
- **Accuracy**: ≥95% correctness vs published CO₂e factors
- **Business**: First 5 paying SME-tier customers within 3 months

## 🗓️ Development Milestones

1. **Week 1-2**: Factor sync + energy endpoint
2. **Week 3-4**: Transport endpoint + ESRS renderer  
3. **Week 5**: DPP generator & QR hosting
4. **Week 6**: Auth, logging, docs → private beta

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/greenstamp

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# API
API_PORT=3000
API_PREFIX=api

# External Services
EMISSION_FACTORS_API_URL=https://api.example.com/factors
QR_STORAGE_BUCKET=greenstamp-qr-codes

# Logging
LOG_LEVEL=info
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](http://localhost:3000/api)
- **Issues**: [GitHub Issues](https://github.com/your-org/greenstamp-api/issues)
- **Email**: support@greenstamp.com

## 🔮 Roadmap

### v0.2 (Future)
- Advanced life-cycle assessments (water, land-use)
- Non-EU regulations (SEC, TCFD)
- Real-time emission factor updates
- Batch processing capabilities
- Advanced analytics dashboard

### v0.3 (Future)
- Machine learning for emission factor optimization
- Integration with major ERP systems
- Mobile SDK for field data collection
- Blockchain-based audit trail 
