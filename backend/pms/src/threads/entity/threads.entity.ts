import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from '../../Users/entity/users.entity';
import { CommunityPost } from 'src/Community/entity/community.entity';

@Entity('threads')
export class Threads extends BaseCustomEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => CommunityPost, (post) => post.threads)
  post: CommunityPost;

  @ManyToOne(() => Users, (user) => user.comments, { nullable: true })
  user?: Users;
}
