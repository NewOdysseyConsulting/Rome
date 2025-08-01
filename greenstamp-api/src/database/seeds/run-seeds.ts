import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../config/database.config';
import { emissionFactorsSeed } from './emission-factors.seed';

async function runSeeds() {
  const configService = new ConfigService();
  const databaseConfig = new DatabaseConfig(configService);
  const dataSourceOptions = await databaseConfig.createTypeOrmOptions();

  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  } as any);

  try {
    await dataSource.initialize();
    console.log('Database connection established');

    // Run seeds
    await emissionFactorsSeed(dataSource);

    console.log('All seeds completed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();