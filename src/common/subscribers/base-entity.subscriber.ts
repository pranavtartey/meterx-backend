import { Injectable } from '@nestjs/common';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  DataSource,
} from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { BaseEntity } from '../entities/base.entity.js';
import { Auth } from '../enums/auth.enum.js';

@Injectable()
@EventSubscriber()
export class BaseEntitySubscriber implements EntitySubscriberInterface<BaseEntity> {
  constructor(
    private readonly cls: ClsService,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return BaseEntity;
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    const currentUser: { id: number } | undefined = this.cls.get(
      Auth.CURRENT_USER,
    );
    if (currentUser && event.entity) {
      event.entity.createdBy = currentUser.id;
      event.entity.updatedBy = currentUser.id;
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    const currentUser: { id: number } | undefined = this.cls.get(
      Auth.CURRENT_USER,
    );
    if (currentUser && event.entity) {
      (event.entity as BaseEntity).updatedBy = currentUser.id;
    }
  }
}
