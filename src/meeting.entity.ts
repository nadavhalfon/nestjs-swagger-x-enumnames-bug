import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  APPROVED = 1,
  PENDING,
  REJECTED,
}

export class Meeting {
  name: string;

  @ApiProperty({
    description: 'The status of the meeting',
    enum: StatusEnum,
    enumName: 'StatusEnum',
    'x-enumNames': ['APPROVED', 'PENDING', 'REJECTED'],
  })
  status: StatusEnum;
}
