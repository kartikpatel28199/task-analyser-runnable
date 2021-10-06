import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusController } from './status.controller';
import { StatusRepository } from './status.repository';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusRepository])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
