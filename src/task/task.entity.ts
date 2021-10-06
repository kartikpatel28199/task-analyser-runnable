import { type } from 'os';
import { Status } from 'src/status/status.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.task, { eager: false })
  user: User;

  @ManyToOne(() => Status, (status) => status.id, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  status?: Status;
}
