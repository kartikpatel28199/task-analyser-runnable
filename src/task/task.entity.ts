import { Status } from 'src/status/status.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Status, (status) => status.id, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  status?: Status;
}
