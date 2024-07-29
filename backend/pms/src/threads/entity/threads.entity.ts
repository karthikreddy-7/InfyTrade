import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from '../../Users/entity/users.entity';
import { CommunityPost } from 'src/Community/entity/community.entity';

@Entity('threads')
export class Threads extends BaseCustomEntity {
  @Column({ type: 'text' })
  content: string;


  @ManyToOne(() => CommunityPost, (post) => post.threads)
  post: CommunityPost;

  @Column({type:'text',nullable:true})
  user?: string;  
}
