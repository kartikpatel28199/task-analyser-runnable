import { IsOptional, IsString } from 'class-validator';

export class GetTaskFilterDto {
  //
  @IsOptional()
  @IsString()
  search?: string;

  //   @IsOptional()
  //   @IsString()
  //   description?: string;
}
