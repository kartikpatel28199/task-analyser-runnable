import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  status?: Status;
}
