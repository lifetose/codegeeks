import { ListEventQueryDto } from '../req/list-event-query.dto';
import { EventResDto } from './event.res.dto';

export class EventListResDto extends ListEventQueryDto {
  data: EventResDto[];
  total: number;
}
