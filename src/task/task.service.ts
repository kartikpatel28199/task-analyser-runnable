import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/status/status.entity';
import { CreateTaskDto } from './dto/create-task.dto';
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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTask(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTask(getTaskFilterDto);
  }

  async updateTaskStatus(
    status: UpdateTaskStatusDto,
    id: string,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(status, id);
  }
}
