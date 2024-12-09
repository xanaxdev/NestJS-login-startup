import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiKeysAccess {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
