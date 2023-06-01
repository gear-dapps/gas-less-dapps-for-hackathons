import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  publicKey: string;

  @Column()
  privateKey: string;

  @Column()
  iv: string;

  @Column({ unique: true })
  rawAddress: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
