import { DataSource } from 'typeorm';
import { EmissionFactor, FactorType } from '../../common/entities/emission-factor.entity';

export const emissionFactorsSeed = async (dataSource: DataSource) => {
  const emissionFactorRepository = dataSource.getRepository(EmissionFactor);

  const factors = [
    // Energy Factors (kg CO2e per kWh)
    {
      name: 'EU Electricity Grid',
      type: FactorType.ENERGY,
      category: 'electricity',
      factor: 0.233, // EU average electricity emission factor
      unit: 'kWh',
      region: 'EU',
      source: 'EU Energy Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Natural Gas',
      type: FactorType.ENERGY,
      category: 'gas',
      factor: 0.202, // kg CO2e per kWh
      unit: 'kWh',
      region: 'EU',
      source: 'EU Energy Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Diesel',
      type: FactorType.ENERGY,
      category: 'diesel',
      factor: 2.68, // kg CO2e per kWh
      unit: 'kWh',
      region: 'EU',
      source: 'EU Energy Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Petrol',
      type: FactorType.ENERGY,
      category: 'petrol',
      factor: 2.31, // kg CO2e per kWh
      unit: 'kWh',
      region: 'EU',
      source: 'EU Energy Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Renewable Energy',
      type: FactorType.ENERGY,
      category: 'renewable',
      factor: 0.0, // Zero emissions for renewable energy
      unit: 'kWh',
      region: 'EU',
      source: 'EU Energy Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },

    // Transport Factors (kg CO2e per t-km)
    {
      name: 'Road Transport - Heavy Goods Vehicle',
      type: FactorType.TRANSPORT,
      category: 'road',
      factor: 0.158, // kg CO2e per t-km
      unit: 't-km',
      region: 'EU',
      source: 'EU Transport Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Rail Transport',
      type: FactorType.TRANSPORT,
      category: 'rail',
      factor: 0.022, // kg CO2e per t-km
      unit: 't-km',
      region: 'EU',
      source: 'EU Transport Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Air Transport - Freight',
      type: FactorType.TRANSPORT,
      category: 'air',
      factor: 0.805, // kg CO2e per t-km
      unit: 't-km',
      region: 'EU',
      source: 'EU Transport Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Sea Transport - Container',
      type: FactorType.TRANSPORT,
      category: 'sea',
      factor: 0.015, // kg CO2e per t-km
      unit: 't-km',
      region: 'EU',
      source: 'EU Transport Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },

    // Material Factors (kg CO2e per kg)
    {
      name: 'Steel',
      type: FactorType.MATERIAL,
      category: 'steel',
      factor: 1.85, // kg CO2e per kg
      unit: 'kg',
      region: 'EU',
      source: 'EU Material Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Aluminum',
      type: FactorType.MATERIAL,
      category: 'aluminum',
      factor: 8.14, // kg CO2e per kg
      unit: 'kg',
      region: 'EU',
      source: 'EU Material Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
    {
      name: 'Plastic',
      type: FactorType.MATERIAL,
      category: 'plastic',
      factor: 2.5, // kg CO2e per kg
      unit: 'kg',
      region: 'EU',
      source: 'EU Material Statistics',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
    },
  ];

  for (const factorData of factors) {
    const existingFactor = await emissionFactorRepository.findOne({
      where: {
        type: factorData.type,
        category: factorData.category,
        region: factorData.region,
      },
    });

    if (!existingFactor) {
      const factor = emissionFactorRepository.create(factorData);
      await emissionFactorRepository.save(factor);
      console.log(`Created emission factor: ${factorData.name}`);
    } else {
      console.log(`Emission factor already exists: ${factorData.name}`);
    }
  }
};