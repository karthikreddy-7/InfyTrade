import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from 'src/Users/entity/users.entity';


@Entity('rankings')
export class Ranking extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  ranking_id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ type: 'int' })
  rank: number;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  score: number;
}
