import { Injectable } from '@nestjs/common';

import { EventID } from '../../../common/types/entity-ids.type';
import { EventRepository } from 'src/modules/repository/services/event.repository';
import { UpdateEventDto } from '../models/dto/req/update-event.dto';
import { EventEntity } from 'src/database/entities/event.entity';
import { ListEventQueryDto } from '../models/dto/req/list-event-query.dto';
import { CreateEventDto } from '../models/dto/req/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  public async create(dto: CreateEventDto): Promise<EventEntity> {
    return await this.eventRepository.save(
      this.eventRepository.create({ ...dto }),
    );
  }

  public async findAll(
    query: ListEventQueryDto,
  ): Promise<[EventEntity[], number]> {
    return await this.eventRepository.findAll(query);
  }

  public async findOne(eventId: EventID): Promise<EventEntity> {
    return await this.eventRepository.getById(eventId);
  }

  public async update(
    eventId: EventID,
    updateUserDto: UpdateEventDto,
  ): Promise<EventEntity> {
    return {} as any;
  }
}
