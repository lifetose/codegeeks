import { Injectable } from '@nestjs/common';
import { EventEntity } from 'src/database/entities/event.entity';
import { ListEventQueryDto } from '../models/dto/req/list-event-query.dto';
import { EventListResDto } from '../models/dto/res/event-list.res.dto';
import { EventResDto } from '../models/dto/res/event.res.dto';

@Injectable()
export class EventsMapper {
  public static toResDtoList(
    data: EventEntity[],
    total: number,
    query: ListEventQueryDto,
  ): EventListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toResDto(data: EventEntity): EventResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      location: data.location,
      created: data.created,
      updated: data.updated,
    };
  }
}
