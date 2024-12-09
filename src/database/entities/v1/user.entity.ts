import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DefaultUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  cratedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ nullable: true })
  blockDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  DeactivationDate: Date;
}
