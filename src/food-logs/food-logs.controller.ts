import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodLogsService } from './food-logs.service';
import { CreateFoodLogDto } from './dto/create-food-log.dto';
import { UpdateFoodLogDto } from './dto/update-food-log.dto';

@Controller('food-logs')
@ApiTags('food logs')
export class FoodLogsController {
  constructor(private readonly foodLogsService: FoodLogsService) {}

  @Get()
  findAll() {
    return this.foodLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodLogsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodLogDto: UpdateFoodLogDto,
  ) {
    return this.foodLogsService.update(id, updateFoodLogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodLogsService.remove(id);
  }
}
