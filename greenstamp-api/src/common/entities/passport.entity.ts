import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('passports')
export class Passport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column()
  manufacturer: string;

  @Column('simple-array')
  materials: string[];

  @Column('decimal', { precision: 10, scale: 4 })
  carbonFootprint: number;

  @Column({ type: 'jsonb', nullable: true })
  jsonLd: object;

  @Column({ nullable: true })
  qrCodeUrl: string;

  @Column({ nullable: true })
  manufacturingDate: string;

  @Column({ nullable: true })
  productUrl: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}