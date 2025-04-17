import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EventID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
@Entity(TableNameEnum.EVENTS)
export class EventEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: EventID;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text')
  category: string;

  @Column('text')
  date: Date;

  @Column('text')
  location: string;
}
