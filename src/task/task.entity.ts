import { Exclude } from 'class-transformer';
import { Status } from 'src/status/status.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  creationDate: Date;

  @ManyToOne((type) => User, (user) => user.task, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Status, (status) => status.id, {
    cascade: true,
    eager: true,
  })
  status?: Status;
}
