import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CustomDatesDto } from './dto/custom-dates.dto';
import { GetTaskFilterDto } from './dto/get-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get()
  getTask(
    @Query() getTaskFilterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTask(getTaskFilterDto, user);
    //
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() status: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(status, id, user);
    //
  }

  @Get('/reports')
  getUsersReport(): Promise<string> {
    return this.taskService.generateUsersReport();
  }

  @Get('/daily/reports')
  getUsersDailyReport(@Body() customDatesDto: CustomDatesDto): Promise<Task[]> {
    return this.taskService.generateUserDailyReport(customDatesDto);
    //
  }

  @Get('/weekly/reports')
  getUsersWeeklyReport(
    @Body() customDatesDto: CustomDatesDto,
  ): Promise<Task[]> {
    return this.taskService.generateUserWeeklyReport(customDatesDto);
  }
}
