import { Module } from '@nestjs/common';
import { EventsController } from './event.contoller';
import { EventsService } from './services/events.service';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventsService],
})
export class ArticlesModule {}
