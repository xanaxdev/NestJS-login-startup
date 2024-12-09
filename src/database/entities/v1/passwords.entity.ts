import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Passwords {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  forUserID: string;

  @CreateDateColumn()
  createdAt: string;
}
