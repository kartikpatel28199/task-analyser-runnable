import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CustomDatesDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;
}
