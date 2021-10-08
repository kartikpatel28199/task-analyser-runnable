import { IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  status: any;
}
