import {
  Listener,
  UserCreatedEvent,
  Subjects,
} from '@deanrtaylor/myfin-common';
import { User } from '../../models/user-model';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    // Check if user already exists
    const user = await User.findByEmail(data.email);
    // if user exists
    if (user) {
      throw new Error('User already exists');
    }
    // update the users information to our finances postgres db
    const result = await User.insertNewUser(data.email, data.username);

    console.log(result);
    // ack the message
    msg.ack();
  }
}
