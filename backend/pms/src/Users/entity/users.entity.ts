import { Entity, Column, OneToMany } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Dashboard } from '../../Dashboards/entity/dashboards.entity';
import { CommunityPost } from '../../Community/entity/community.entity';
import { Portfolio } from '../../Portfolios/entity/portfolios.entity';
import { Ranking } from '../../Rankings/entity/rankings.entity';
import { Threads } from '../../threads/entity/threads.entity';
import { holding } from 'src/holdings/entity/holdings.entity';

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity('users')
export class Users extends BaseCustomEntity {
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: Visibility, default: Visibility.PRIVATE })
  visibility: Visibility;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  profit: number;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user)
  dashboards: Dashboard[];

  @OneToMany(() => CommunityPost, (communityPost) => communityPost.user)
  posts: CommunityPost[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user,{ eager: true })
  portfolios: Portfolio[];

  @OneToMany(() => holding, (holding) => holding.user,{ eager: true })
  holdings: holding[];

  @OneToMany(() => Ranking, (ranking) => ranking.user)
  rankings: Ranking[];
}
