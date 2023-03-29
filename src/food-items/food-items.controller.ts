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
  Query,
} from '@nestjs/common';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'Food name Optional',
    required: false,
  })
  @ApiOkResponse({ type: FoodItemEntity, isArray: true })
  findAll(@Query('name') name?: string) {
    return this.foodItemsService.findAll({
      where: { name: { contains: name, mode: 'insensitive' } },
    });
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
