import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {
  @Exclude()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  status: string;
}
