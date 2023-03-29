import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodLogDto } from './dto/create-food-log.dto';
import { UpdateFoodLogDto } from './dto/update-food-log.dto';
import { endOfDay, startOfDay } from 'date-fns';
import { NutritionInfo } from './types/nutrition-info.type';

@Injectable()
export class FoodLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(patientId: number, createFoodLogDto: CreateFoodLogDto) {
    const { foodItem, ...result } = await this.prisma.log.create({
      data: { patientId, ...createFoodLogDto },
      include: { foodItem: true },
    });
    return { ...result, caloriesConsumed: foodItem.calories * result.quantity };
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LogWhereUniqueInput;
    where?: Prisma.LogWhereInput;
    orderBy?: Prisma.LogOrderByWithRelationInput;
  }) {
    const {
      skip,
      take,
      cursor,
      where = { deletedAt: null },
      orderBy,
    } = params ?? {};

    return this.prisma.log.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return this.prisma.log.findUnique({ where: { id } });
  }

  update(id: number, updateFoodLogDto: UpdateFoodLogDto) {
    return this.prisma.log.update({
      where: { id },
      data: updateFoodLogDto,
    });
  }

  remove(id: number) {
    return this.prisma.log.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getNutritionInfo(patientId: number, date: Date) {
    const foodLogs = await this.prisma.log.findMany({
      where: {
        patientId,
        date: {
          lte: endOfDay(date),
          gte: startOfDay(date),
        },
      },
      include: {
        foodItem: true,
      },
    });

    return foodLogs.reduce(
      (acc: NutritionInfo, foodLog) => {
        acc.totalCalories += foodLog.foodItem.calories * foodLog.quantity;
        acc.proteins += (foodLog.foodItem.proteins ?? 0) * foodLog.quantity;
        acc.carbs += (foodLog.foodItem.carbs ?? 0) * foodLog.quantity;
        acc.fats += (foodLog.foodItem.fats ?? 0) * foodLog.quantity;
        return acc;
      },
      {
        totalCalories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
        foodLogs,
      } as NutritionInfo,
    );
  }
}
