import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum FactorType {
  ENERGY = 'energy',
  TRANSPORT = 'transport',
  MATERIAL = 'material',
}

@Entity('emission_factors')
export class EmissionFactor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FactorType,
  })
  type: FactorType;

  @Column()
  category: string; // e.g., 'electricity', 'diesel', 'road_transport'

  @Column('decimal', { precision: 10, scale: 4 })
  factor: number; // kg CO2e per unit

  @Column()
  unit: string; // kWh, t-km, kg, etc.

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  source: string; // Data source reference

  @Column({ type: 'date' })
  validFrom: Date;

  @Column({ type: 'date', nullable: true })
  validTo: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}