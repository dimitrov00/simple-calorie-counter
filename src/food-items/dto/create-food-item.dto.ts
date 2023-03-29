import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateFoodItemDto {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 800 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty({ example: 20.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  proteins?: number;

  @ApiProperty({ example: 60.2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  carbs?: number;

  @ApiProperty({ example: 15.3 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fats?: number;
}
