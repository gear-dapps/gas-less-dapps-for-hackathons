import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class Dapp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.dapps)
  @JoinColumn({ name: 'user_id' })
  owner: User;

  constructor(props: Partial<Dapp>) {
    Object.assign(this, props);
  }
}
