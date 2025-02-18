import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthEvents } from '../../auth/events/auth-events.enum';
import { UserLoggedInEvent } from '../../auth/events/definitions/user-logged-in.event';
import { UserRegisteredEvent } from '../../auth/events/definitions/user-registered.event';

@Injectable()
export class UserCoreEventController {
  @OnEvent(AuthEvents.UserLoggedInEvent)
  public async handleUserLoggedInEvent(
    payload: UserLoggedInEvent,
  ): Promise<void> {}

  @OnEvent(AuthEvents.UserLoggedInEvent)
  public async handleUserRegisteredEvent(
    payload: UserRegisteredEvent,
  ): Promise<void> {}
}
