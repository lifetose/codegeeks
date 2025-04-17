import { ApiProperty } from '@nestjs/swagger';

export class EventResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Event ID',
  })
  id: string;

  @ApiProperty({
    example: 'Event Title',
    description: 'Event Title',
  })
  title: string;

  @ApiProperty({
    example: 'Event Description',
    description: 'Event Description',
  })
  description: string;

  @ApiProperty({
    example: 'Event Category',
    description: 'Event Category',
  })
  category: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Event Date',
  })
  date: Date;

  @ApiProperty({
    example: 'Event Location',
    description: 'Event Location',
  })
  location: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Updated Date',
  })
  updated: Date;
}
