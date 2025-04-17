import { Global, Module } from '@nestjs/common';
import { EventRepository } from './services/event.repository';

const repositories = [EventRepository];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
