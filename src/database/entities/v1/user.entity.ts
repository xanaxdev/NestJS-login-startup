import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Passwords } from './passwords.entity';

@Entity()
export class DefaultUsers {
  //? User Unique ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //? User First Name
  @Column()
  firstName: string;

  //? User Last Name
  @Column()
  lastName: string;

  //? User email - must be unique
  @Column({ unique: true })
  email: string;

  //? User password
  @Column()
  password: string;

  //? Auto date - create user date
  @CreateDateColumn()
  cratedAt: Date;

  //? Auto date - last update date
  @UpdateDateColumn()
  updatedAt: Date;

  //? For function USER BANS
  @Column({ default: false })
  isBlocked: boolean;

  //? For function USER BANS
  @Column({ nullable: true })
  blockDate: Date;

  //? For function SUSPENSION
  @Column({ default: true })
  isActive: boolean;

  //? For function SUSPENSION
  @Column({ nullable: true })
  DeactivationDate: Date;

  //? RELATION with previous user passwords.
  @OneToMany(() => Passwords, (password) => password.user)
  passwords: Passwords[];
}
