import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseCustomEntity } from '../../utilities/baseEntity';
import { Dashboard } from '../../Dashboards/entity/dashboards.entity';

@Entity('widgets')
export class Widget extends BaseCustomEntity {
  @ManyToOne(() => Dashboard, (dashboard) => dashboard.widgets)
  @JoinColumn({ name: 'dashboardId' })
  dashboard: Dashboard;

  @Column()
  dashboardId: string;

  @Column({ type: 'varchar', length: 50 })
  chartType: string;

  @Column({ type: 'varchar', length: 50 })
  stockSymbol: string;

  @Column({ type: 'jsonb' })
  config: object;
}
