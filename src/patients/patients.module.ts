import { FoodLogsService } from 'src/food-logs/food-logs.service';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, FoodLogsService],
  imports: [PrismaModule],
})
export class PatientsModule {}
