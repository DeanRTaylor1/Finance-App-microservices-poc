import { app } from './app';
import { UserCreatedListener } from './events/listeners/user-created-listener';
import { natsWrapper } from './nats-wrapper';
import pool from './pool';

const start = async () => {
  console.log('Starting up...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (
    !process.env.RDS_HOST ||
    !process.env.RDS_USER ||
    !process.env.RDS_PASSWORD
  ) {
    throw new Error('RDS config not defined correctly');
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close()); //listen for interupt signal
    process.on('SIGTERM', () => natsWrapper.client.close()); //listen for terminate signal when using ctrl cs or rs

    new UserCreatedListener(natsWrapper.client).listen();

    pool.connect({
      host: process.env.RDS_HOST,
      port: 5432,
      database: 'deanrtaylorfinance',
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
    });

    console.log('Connected to Postgres');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
