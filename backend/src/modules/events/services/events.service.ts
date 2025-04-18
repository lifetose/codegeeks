import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

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
    try {
      const event = await this.eventRepository.getById(eventId);
      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving the event',
      );
    }
  }

  public async update(
    eventId: EventID,
    dto: UpdateEventDto,
  ): Promise<EventEntity> {
    const event = await this.eventRepository.getById(eventId);
    Object.assign(event, dto);
    return await this.eventRepository.save(event);
  }

  public async delete(eventId: EventID): Promise<void> {
    const event = await this.eventRepository.getById(eventId);
    await this.eventRepository.remove(event);
  }

  public async getSimilarEvents(eventId: EventID): Promise<EventEntity[]> {
    const targetEvent = await this.eventRepository.getById(eventId);

    if (!targetEvent) {
      throw new Error('Event not found');
    }

    const dateRangeStart = new Date(targetEvent.date);
    const dateRangeEnd = new Date(targetEvent.date);
    dateRangeStart.setDate(dateRangeStart.getDate() - 7);
    dateRangeEnd.setDate(dateRangeEnd.getDate() + 7);

    return this.eventRepository.findSimilarEvents({
      category: targetEvent.category,
      location: targetEvent.location,
      dateStart: dateRangeStart,
      dateEnd: dateRangeEnd,
      excludeId: targetEvent.id,
    });
  }
}
