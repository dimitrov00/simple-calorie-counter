import { Log } from '@prisma/client';

export type NutritionInfo = {
  totalCalories: number;
  proteins: number;
  carbs: number;
  fats: number;

  foodLogs: Log[];
};
