import { Module } from '@nestjs/common';
import { FoodItemsService } from './food-items.service';
import { FoodItemsController } from './food-items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FoodItemsController],
  providers: [FoodItemsService],
  imports: [PrismaModule],
})
export class FoodItemsModule {}
