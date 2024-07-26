import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from '../../Users/entity/users.entity';


@Entity('community_posts')
export class CommunityPost extends BaseCustomEntity {

  @Column({ type: 'varchar',nullable:true})
  userId: string;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @Column({ type: 'text' })
  content: string;
}
