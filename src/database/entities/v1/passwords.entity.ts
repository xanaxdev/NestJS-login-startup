import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultUsers } from './user.entity';

@Entity()
export class Passwords {
  // ? Password ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ? User password (changing/seting)
  @Column()
  password: string;

  // ? Relation for USER
  @ManyToOne(() => DefaultUsers, (user) => user.passwords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'forUserID' })
  user: DefaultUsers;

  // ? Date when password was Creating/Change
  @CreateDateColumn()
  createdAt: string;
}
