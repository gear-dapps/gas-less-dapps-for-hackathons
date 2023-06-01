import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dapp } from './dapp.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  publicKey: string;

  @Column({ unique: true })
  publicKeyRaw: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Dapp, (dapp) => dapp.owner, { nullable: true, cascade: true })
  dapps: Dapp[];

  @Column({ default: false })
  isApproved: boolean;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
