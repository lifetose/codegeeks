import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventID } from 'src/common/types/entity-ids.type';
import { UpdateEventDto } from './models/dto/req/update-event.dto';
import { CreateEventDto } from './models/dto/req/create-event.dto';
import { EventResDto } from './models/dto/res/event.res.dto';
import { EventsMapper } from './services/events.mapper';
import { EventListResDto } from './models/dto/res/event-list.res.dto';
import { ListEventQueryDto } from './models/dto/req/list-event-query.dto';
import { EventsService } from './services/events.service';

@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  public async create(@Body() dto: CreateEventDto): Promise<EventResDto> {
    const result = await this.eventService.create(dto);
    return EventsMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @Query() query: ListEventQueryDto,
  ): Promise<EventListResDto> {
    const [entities, total] = await this.eventService.findAll(query);
    return EventsMapper.toResDtoList(entities, total, query);
  }

  @Get(':eventId')
  public async findOne(
    @Param('eventId') eventId: EventID,
  ): Promise<EventResDto> {
    const result = await this.eventService.findOne(eventId);
    return EventsMapper.toResDto(result);
  }

  @Patch(':eventId')
  public async update(
    @Param('eventId') eventId: EventID,
    @Body() dto: UpdateEventDto,
  ): Promise<EventResDto> {
    const result = await this.eventService.update(eventId, dto);
    return EventsMapper.toResDto(result);
  }

  @Delete(':eventId')
  public async delete(@Param('eventId') eventId: EventID): Promise<void> {
    await this.eventService.delete(eventId);
  }
}
