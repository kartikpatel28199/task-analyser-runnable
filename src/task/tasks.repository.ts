import { MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { Status } from 'src/status/status.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    //
    const { title, description, status } = createTaskDto;
    let stat: any = 1;
    if (status) {
      stat = await this.getStatus(status);
    }
    const task = this.create({
      title,
      description,
      status: stat,
    });

    await this.save(task);
    return task;
  }

  async getTask(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = getTaskFilterDto;
    const query = this.createQueryBuilder('task')
      .select(['task.title', 'task.description'])
      .innerJoinAndSelect('task.status', 'status');

    if (status) {
      query.andWhere('task.status = :status', {
        status: await this.getStatus(status),
      });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = query.getMany();
    return tasks;
  }

  async updateTaskStatus(
    updateTaskStatus: UpdateTaskStatusDto,
    id: string,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    const task = await this.findOne({ where: { id } });
    const stat: any = await this.getStatus(status);
    const num = stat - task.status.id;
    console.log(stat, task.status.id);
    if (num !== 1) {
      //
      throw new MethodNotAllowedException('That jump is not allowed');
    }

    task.status = stat;
    this.save(task);
    return task;
    //
  }

  async getStatus(status: Status): Promise<number> {
    const getStat: Status = await getRepository(Status)
      .createQueryBuilder('status')
      .where('status = :stat', { stat: status })
      .getOne();
    if (!getStat) throw new NotFoundException('There is no such status');
    return getStat.id;
  }
  //
}
