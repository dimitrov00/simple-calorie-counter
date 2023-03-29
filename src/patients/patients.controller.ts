import { NutritionInfo } from './../food-logs/types/nutrition-info.type';
import { FoodLogEntity } from './../food-logs/entities/food-log.entity';
import { CreateFoodLogDto } from './../food-logs/dto/create-food-log.dto';
import { PrismaClientExceptionFilter } from './../prisma-client-exception/prisma-client-exception.filter';
import { PatientEntity } from './entities/patient.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseFilters,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FoodLogsService } from 'src/food-logs/food-logs.service';
import { NutritionInfoDto } from 'src/food-logs/dto/nutrition-info.dto';

@Controller('patients')
@ApiTags('patients')
@UseFilters(PrismaClientExceptionFilter)
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly foodLogService: FoodLogsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: PatientEntity })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PatientEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException(`Patient with id: ${id} not found`);
    }

    return patient;
  }

  @Patch(':id')
  @ApiOkResponse({ type: PatientEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PatientEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }

  @Post(':id/food-logs')
  @ApiOkResponse({ type: FoodLogEntity })
  addFoodLog(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFoodLogDto: CreateFoodLogDto,
  ) {
    return this.foodLogService.create(id, {
      ...createFoodLogDto,
    });
  }

  @Get(':id/nutrition-info')
  @ApiOkResponse({ type: NutritionInfoDto })
  caloriesConsumed(
    @Param('id', ParseIntPipe) id: number,
    @Query('date') date: Date,
  ) {
    return this.foodLogService.getNutritionInfo(id, date);
  }
}
