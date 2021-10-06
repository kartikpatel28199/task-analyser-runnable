import { IsOptional, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';

export class GetTaskFilterDto {
  //
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: Status;
}
