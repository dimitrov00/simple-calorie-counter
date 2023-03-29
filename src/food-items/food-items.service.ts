import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';

@Injectable()
export class FoodItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFoodItemDto: CreateFoodItemDto) {
    return this.prisma.foodItem.create({ data: createFoodItemDto });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FoodItemWhereUniqueInput;
    where?: Prisma.FoodItemWhereInput;
    orderBy?: Prisma.FoodItemOrderByWithRelationInput;
  }) {
    const {
      skip,
      take,
      cursor,
      where = { deletedAt: null },
      orderBy,
    } = params ?? {};

    return this.prisma.foodItem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    return this.prisma.foodItem.findUnique({ where: { id } });
  }

  update(id: number, updateFoodItemDto: UpdateFoodItemDto) {
    return this.prisma.foodItem.update({
      where: { id },
      data: updateFoodItemDto,
    });
  }

  remove(id: number) {
    return this.prisma.foodItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
