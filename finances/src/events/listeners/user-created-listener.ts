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
    // find the ticket that the order is reserving
    const user = await User.findByEmail(data.email);
    // if no ticket, throw error
    if (user) {
      throw new Error('User already exists');
    }
    // Mark the ticket as being reserved by setting its orderId property
    const result = await User.insert(data.email);
    //save the ticket
    console.log(result);
    // ack the message
    msg.ack();
  }
}
