import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { FoodItemsModule } from './food-items/food-items.module';
import { FoodLogsModule } from './food-logs/food-logs.module';

@Module({
  imports: [PrismaModule, PatientsModule, FoodItemsModule, FoodLogsModule],
})
export class AppModule {}
