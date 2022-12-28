import {
  Publisher,
  Subjects,
  UserCreatedEvent,
} from '@deanrtaylor/myfin-common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
