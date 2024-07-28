import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';

@Entity('stocks')
export class Stock extends BaseCustomEntity {
  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('bigint')
  volume: number;

  @Column('decimal')
  change: number;

  @Column('decimal')
  percentage_change: number;
}
