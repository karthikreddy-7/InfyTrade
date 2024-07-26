import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from 'src/Users/entity/users.entity';


@Entity('community_posts')
export class CommunityPost extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @Column({ type: 'text' })
  content: string;
}
