import { Entity, Column } from 'typeorm';
import { BaseCustomEntity } from 'src/utilities/baseEntity';

@Entity()
export class Stocks extends BaseCustomEntity {
  @Column()
  name: string;

  @Column()
  price: number;
}
