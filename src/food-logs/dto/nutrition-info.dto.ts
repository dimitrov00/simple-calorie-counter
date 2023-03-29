import { FoodLogEntity } from './../entities/food-log.entity';
import { ApiProperty } from '@nestjs/swagger';
import { NutritionInfo } from './../types/nutrition-info.type';

export class NutritionInfoDto implements NutritionInfo {
  @ApiProperty()
  totalCalories: number;

  @ApiProperty()
  proteins: number;

  @ApiProperty()
  carbs: number;

  @ApiProperty()
  fats: number;

  @ApiProperty()
  foodLogs: FoodLogEntity[];
}
