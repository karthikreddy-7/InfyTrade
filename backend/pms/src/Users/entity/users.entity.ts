import { Entity, Column } from 'typeorm';
import { BaseCustomEntity } from 'src/utilities/baseEntity';

@Entity()
export class Users extends BaseCustomEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
