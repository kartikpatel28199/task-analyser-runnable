import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/status/status.entity';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CustomDatesDto } from './dto/custom-dates.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async getTask(
    getTaskFilterDto: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getTask(getTaskFilterDto, user);
  }

  async updateTaskStatus(
    status: UpdateTaskStatusDto,
    id: string,
    user: User,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(status, id, user);
  }

  async generateUsersReport(): Promise<string> {
    return this.tasksRepository.generateUserReport();
  }

  async generateUserDailyReport(
    customDatesDto: CustomDatesDto,
  ): Promise<Task[]> {
    //
    return this.tasksRepository.generateUserDailyReport(customDatesDto);
  }

  async generateUserWeeklyReport(
    customDatesDto: CustomDatesDto,
  ): Promise<Task[]> {
    return this.tasksRepository.generateUserWeeklyReport(customDatesDto);
  }
}
