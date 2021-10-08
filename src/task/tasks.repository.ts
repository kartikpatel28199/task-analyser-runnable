import { MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { CustomDatesDto } from './dto/custom-dates.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // It is for creating the Task Using CreateTaskDto
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, status } = createTaskDto;
    let stat: any = 1;
    if (status) {
      stat = status;
    }

    const task = this.create({
      title,
      description,
      creationDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ),
      status: stat,
      user,
    });

    return await this.save(task);
  }

  // It is for getting the task with filters provided by user
  async getTask(
    getTaskFilterDto: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { search, status } = getTaskFilterDto;
    const query = this.createQueryBuilder('task')
      .select(['task.title', 'task.description', 'task.creationDate'])
      .where({ user })
      .innerJoinAndSelect('task.status', 'status');

    if (status) {
      query.andWhere('task.status = :status', {
        status,
      });
    }

    // Providing the filters
    if (search) {
      query.andWhere(
        '(task.title LIKE LOWER(:search) OR task.description LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  // It is for updating the status of any particular task
  async updateTaskStatus(
    updateTaskStatus: UpdateTaskStatusDto,
    id: string,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    const task = await this.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException(`No such task ${id}`);
    const num = status - task.status.id;
    if (num !== 1) {
      throw new MethodNotAllowedException('That jump is not allowed');
    }

    task.status = status;
    return this.save(task);
  }

  // It is for getting the percentage of users created overall task
  async generateUserReport(): Promise<string> {
    const getUser: any = await getRepository(Task)
      .createQueryBuilder('task')
      .select(['task.user', 'count(*) as count'])
      .groupBy('task.userId')
      .getRawMany();
    const total = await this.count();
    // const js = JSON.stringify(getUser);
    const obj = JSON.parse(JSON.stringify(getUser), function (key, value) {
      let temp = undefined;
      if (key === 'count') {
        temp = Math.round((parseInt(value) / total) * 100);
      } else {
        temp = value;
      }
      return temp;
    });

    return obj;
  }

  // It is for getting the daily basi created tasks
  async generateUserDailyReport(
    customDatesDto: CustomDatesDto,
  ): Promise<Task[]> {
    const { startDate, endDate } = customDatesDto;
    this.checkDate(new Date(startDate), new Date(endDate));
    const getUser: any = await getRepository(Task)
      .createQueryBuilder('task')
      .select(['task.creationDate', 'count(*) as count'])
      .andWhere(`task.creationDate BETWEEN :start  AND  :end`, {
        start: startDate,
        end: endDate,
      })
      .groupBy('task.creationDate')
      .orderBy('task.creationDate')
      .getRawMany();
    return getUser;
  }

  // Checks whether endDate is not less than start date because if it is less than start date than than report is in not properly
  checkDate(startDate, endDate) {
    if (endDate.getTime() < startDate.getTime()) {
      throw new MethodNotAllowedException('Invalid Input Date');
    }
  }

  // For fetching the report on the overall week basis
  async generateUserWeeklyReport(
    customDatesDto: CustomDatesDto,
  ): Promise<Task[]> {
    const { startDate, endDate } = customDatesDto;
    this.checkDate(new Date(startDate), new Date(endDate));

    const getUser: any = await getRepository(Task)
      .createQueryBuilder('task')
      .select([
        'WEEK(task.creationDate) WeekNumber',
        'COUNT(task.id) Task_Created',
      ])
      .andWhere(`task.creationDate BETWEEN :start  AND  :end`, {
        start: startDate,
        end: endDate,
      })
      .groupBy('WEEK(task.creationDate)')
      .orderBy('WEEK(task.creationDate)')
      .getRawMany();
    return getUser;
    //
  }

  // checks the status
  // async getStatus(status: Status): Promise<number> {
  //   const getStat: Status = await getRepository(Status)
  //     .createQueryBuilder('status')
  //     .where('status = :stat', { stat: status })
  //     .getOne();
  //   if (!getStat) throw new NotFoundException('There is no such status');
  //   return getStat.id;
  // }
  //
}
