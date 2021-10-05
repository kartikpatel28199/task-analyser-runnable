import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    //
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
    });

    await this.save(task);
    return task;
  }

  async getTask(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search } = getTaskFilterDto;
    const query = this.createQueryBuilder('task');
    console.log(search);

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = query.getMany();
    return tasks;
  }
  //
}
