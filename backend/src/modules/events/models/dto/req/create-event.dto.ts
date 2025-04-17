import { PickType } from '@nestjs/swagger';

import { BaseEventReqDto } from './base-event.req.dto';

export class CreateEventDto extends PickType(BaseEventReqDto, [
  'title',
  'description',
  'category',
  'date',
  'location',
]) {}
