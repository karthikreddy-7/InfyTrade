import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Dashboard } from '../../Dashboards/entity/dashboards.entity';


@Entity('widgets')
export class Widget extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  widget_id: number;

  @ManyToOne(() => Dashboard, (dashboard) => dashboard.widgets)
  dashboard: Dashboard;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column({ type: 'jsonb' })
  config: object;
}