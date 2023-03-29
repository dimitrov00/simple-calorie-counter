import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@prisma/client';

export class PatientEntity implements Patient {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date | null;
}
