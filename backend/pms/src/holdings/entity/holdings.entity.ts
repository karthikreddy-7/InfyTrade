import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../../Users/entity/users.entity';
import { BaseCustomEntity } from '../../utilities/baseEntity';

@Entity('holdings')
export class holding extends BaseCustomEntity {
  @ManyToOne(() => Users, (user) => user.holdings)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  userId: string;

  @Column()
  stock: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  averagePrice: number;
}
