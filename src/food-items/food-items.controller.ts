import { FoodItemEntity } from './entities/food-item.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('food-items')
@ApiTags('food items')
@UseFilters(PrismaClientExceptionFilter)
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @Post()
  @ApiCreatedResponse({ type: FoodItemEntity })
  create(@Body() createFoodItemDto: CreateFoodItemDto) {
    return this.foodItemsService.create(createFoodItemDto);
  }

  @Get()
  @ApiOkResponse({ type: FoodItemEntity, isArray: true })
  findAll() {
    return this.foodItemsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FoodItemEntity })
  findOne(@Param('id') id: string) {
    return this.foodItemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FoodItemEntity })
  update(
    @Param('id') id: string,
    @Body() updateFoodItemDto: UpdateFoodItemDto,
  ) {
    return this.foodItemsService.update(+id, updateFoodItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FoodItemEntity })
  remove(@Param('id') id: string) {
    return this.foodItemsService.remove(+id);
  }
}
