import { ApiProperty } from '@nestjs/swagger';
import { Log } from '@prisma/client';

export class FoodLogEntity implements Log {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  foodItemId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<FoodLogEntity>) {
    Object.assign(this, partial);
  }
}
