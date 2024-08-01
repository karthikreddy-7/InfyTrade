import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from '../../Users/entity/users.entity';
import { Widget } from 'src/Widgets/entity/widgets.entity';

@Entity('dashboards')
export class Dashboard extends BaseCustomEntity {
  @ManyToOne(() => Users, (user) => user.dashboards)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  layout: object;

  @OneToMany(() => Widget, (widget) => widget.dashboard,{ eager: true })
  widgets: Widget[];
}
