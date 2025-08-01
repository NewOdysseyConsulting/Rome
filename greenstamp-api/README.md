# GreenStamp API

A NestJS-based API for carbon footprint calculation and Digital Product Passport generation, designed to help SMEs comply with CSRD regulations.

## Features

- **Carbon Footprint Calculation**: Convert energy and transport data into CO₂e metrics
- **Digital Product Passports**: Generate machine-readable DPPs with QR codes
- **CSRD Reporting**: Generate ESRS-compliant reports
- **Authentication**: JWT-based API key management
- **Swagger Documentation**: Interactive API documentation

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Local Development

1. **Clone and install dependencies**
   ```bash
   cd greenstamp-api
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Database setup**
   ```bash
   # Start PostgreSQL (if using Docker)
   docker run --name greenstamp-postgres -e POSTGRES_DB=greenstamp -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:14-alpine
   
   # Run migrations and seeds
   npm run migration:run
   npm run seed
   ```

4. **Start development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

### Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api
```

## API Documentation

Once running, visit:
- **Swagger UI**: `http://localhost:3000/api`
- **Health Check**: `http://localhost:3000/health`

## Key Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get API key

### Activity Data
- `POST /api/activity/energy` - Submit energy consumption
- `POST /api/activity/transport` - Submit transport data

### Reporting
- `GET /api/report/csrd` - Generate CSRD report

### Digital Product Passports
- `POST /api/passport` - Create DPP with QR code

## Example Usage

### Register a user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "securepassword123",
    "companyName": "GreenCorp Ltd"
  }'
```

### Submit energy data
```bash
curl -X POST http://localhost:3000/api/activity/energy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "kwh": 1000,
    "energyType": "electricity",
    "region": "EU",
    "timestamp": "2024-01-15T10:00:00Z"
  }'
```

### Generate CSRD report
```bash
curl -X GET "http://localhost:3000/api/report/csrd?startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Development

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run migration:run` - Run database migrations
- `npm run seed` - Seed database with initial data

### Project Structure

```
src/
├── modules/           # Feature modules
│   ├── auth/         # Authentication
│   ├── activity/     # Activity data ingestion
│   ├── calculation/  # CO₂e calculations
│   ├── passport/     # Digital Product Passports
│   └── reporting/    # CSRD reporting
├── common/           # Shared code
│   ├── dto/         # Data transfer objects
│   ├── entities/    # Database entities
│   └── guards/      # Authentication guards
└── config/          # Configuration
```

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Environment Variables

Required environment variables:
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT signing secret
- `PORT` - API port (default: 3000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.