import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EventID } from 'src/common/types/entity-ids.type';
import { EventEntity } from 'src/database/entities/event.entity';
import { ListEventQueryDto } from 'src/modules/events/models/dto/req/list-event-query.dto';

@Injectable()
export class EventRepository extends Repository<EventEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EventEntity, dataSource.manager);
  }

  public async findAll(
    query: ListEventQueryDto,
  ): Promise<[EventEntity[], number]> {
    const qb = this.createQueryBuilder('event');

    if (query.search) {
      qb.andWhere('CONCAT(event.title, event.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(eventId: EventID): Promise<EventEntity> {
    const qb = this.createQueryBuilder('event');
    qb.where('event.id = :eventId', { eventId });
    return await qb.getOne();
  }

  public async findSimilarEvents(params: {
    category: string;
    location: string;
    dateStart: Date;
    dateEnd: Date;
    excludeId: EventID;
  }): Promise<EventEntity[]> {
    return this.createQueryBuilder('event')
      .where('event.category = :category', { category: params.category })
      .andWhere('event.location = :location', { location: params.location })
      .andWhere('event.date BETWEEN :dateStart AND :dateEnd', {
        dateStart: params.dateStart,
        dateEnd: params.dateEnd,
      })
      .andWhere('event.id != :excludeId', { excludeId: params.excludeId })
      .getMany();
  }
}
