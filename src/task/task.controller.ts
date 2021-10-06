import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Status } from 'src/status/status.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
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

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() status: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(status, id);
    //
  }
}
