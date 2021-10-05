import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  getTask(@Query() getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTask(getTaskFilterDto);
    //
  }
}
