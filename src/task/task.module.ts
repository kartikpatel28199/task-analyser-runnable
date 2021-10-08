import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
