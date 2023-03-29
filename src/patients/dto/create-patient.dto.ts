import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @MinLength(2)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(2)
  @ApiProperty()
  lastName: string;
}
