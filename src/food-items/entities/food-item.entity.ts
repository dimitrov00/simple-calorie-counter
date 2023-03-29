import { ApiProperty } from '@nestjs/swagger';
import { FoodItem } from '@prisma/client';

export class FoodItemEntity implements FoodItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Pizza' })
  name: string;

  @ApiProperty({ example: 800 })
  calories: number;

  @ApiProperty({ example: 20.5 })
  proteins: number | null;

  @ApiProperty({ example: 60.2 })
  carbs: number | null;

  @ApiProperty({ example: 15.3 })
  fats: number | null;

  @ApiProperty({ example: '2023-03-29T00:00:00.000Z' })
  deletedAt: Date;

  @ApiProperty({ example: '2023-03-29T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-03-29T00:00:00.000Z' })
  updatedAt: Date;
}
