import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum ActivityType {
  ENERGY = 'energy',
  TRANSPORT = 'transport',
}

export enum EnergyType {
  ELECTRICITY = 'electricity',
  GAS = 'gas',
  DIESEL = 'diesel',
  PETROL = 'petrol',
  RENEWABLE = 'renewable',
}

export enum TransportMode {
  ROAD = 'road',
  RAIL = 'rail',
  AIR = 'air',
  SEA = 'sea',
}

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  unit: string; // kWh, t-km, etc.

  @Column({
    type: 'enum',
    enum: EnergyType,
    nullable: true,
  })
  energyType?: EnergyType;

  @Column({
    type: 'enum',
    enum: TransportMode,
    nullable: true,
  })
  transportMode?: TransportMode;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 4, nullable: true })
  calculatedCO2e: number;

  @Column({ type: 'timestamp' })
  activityDate: Date;

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}