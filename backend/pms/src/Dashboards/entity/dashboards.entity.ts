import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Users } from '../../Users/entity/users.entity';
import { Widget } from 'src/Widgets/entity/widgets.entity';

@Entity('dashboards')
export class Dashboard extends BaseCustomEntity {
  @ManyToOne(() => Users, (user) => user.dashboards)
  user: Users;

  @Column({ type: 'jsonb' })
  layout: object;

  @OneToMany(() => Widget, (widget) => widget.dashboard)
  widgets: Widget[];
}
