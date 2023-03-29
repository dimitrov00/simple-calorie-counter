import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFoodLogDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  foodItemId: number;

  @ApiProperty({ example: '2023-03-29T00:00:00.000Z' })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  quantity: number;
}
