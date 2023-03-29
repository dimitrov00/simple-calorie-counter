import { Module } from '@nestjs/common';
import { FoodLogsService } from './food-logs.service';
import { FoodLogsController } from './food-logs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FoodLogsController],
  providers: [FoodLogsService],
  imports: [PrismaModule],
})
export class FoodLogsModule {}
