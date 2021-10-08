import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'task-analyser',
      port: 3306,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    TaskModule,
    StatusModule,
  ],
})
export class AppModule {}
