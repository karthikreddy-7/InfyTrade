import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';

@Entity('stocks')
export class Stock extends BaseCustomEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  symbol: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'jsonb' })
  data: object;
}
