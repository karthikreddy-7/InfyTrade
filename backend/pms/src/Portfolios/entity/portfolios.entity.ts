import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from '../../Users/entity/users.entity';


@Entity('portfolios')
export class Portfolio extends BaseCustomEntity {
  @ManyToOne(() => Users, (user) => user.portfolios)
  user: Users;

  @Column({ type: 'jsonb' })
  holdings: object;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  total_value: number;
}
