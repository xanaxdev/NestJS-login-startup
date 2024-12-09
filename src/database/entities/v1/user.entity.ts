/**
 * What is here?
 * Table for user from Client Panel
 * ---------------------------------
 * Author: Kacper Płaczek
 * Date: 2024-12-09
 * Purpose: Manage user data
 **/

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
