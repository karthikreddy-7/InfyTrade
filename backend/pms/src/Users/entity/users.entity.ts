import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Dashboard } from 'src/Dashboards/entity/dashboards.entity';
import { CommunityPost } from 'src/Community/entity/community.entity';
import { Portfolio } from 'src/Portfolios/entity/portfolios.entity';
import { Ranking } from 'src/Rankings/entity/rankings.entity';

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity('users')
export class Users extends BaseCustomEntity {
  @Column({ type: 'varchar', length: 255, unique: true, nullable:true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text'})
  password: string;

  @Column({ type: 'enum', enum: Visibility, default: Visibility.PRIVATE })
  visibility: Visibility;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user)
  dashboards: Dashboard[];

  @OneToMany(() => CommunityPost, (communityPost) => communityPost.user)
  posts: CommunityPost[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];

  @OneToMany(() => Ranking, (ranking) => ranking.user)
  rankings: Ranking[];
}
