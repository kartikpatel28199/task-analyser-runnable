import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
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
}
