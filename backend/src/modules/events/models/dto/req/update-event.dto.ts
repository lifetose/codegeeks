import { PickType } from '@nestjs/swagger';

import { BaseEventReqDto } from './base-event.req.dto';

export class UpdateEventDto extends PickType(BaseEventReqDto, [
  'title',
  'description',
  'category',
  'date',
  'location',
]) {}
