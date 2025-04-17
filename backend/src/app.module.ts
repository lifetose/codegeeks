import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { EventsModule } from './modules/events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    RepositoryModule,
    PostgresModule,

    EventsModule,
  ],
})
export class AppModule {}
