import { app } from './app';
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
    pool.connect({
      host: process.env.RDS_HOST,
      port: 5432,
      database: 'deanrtaylorfinance',
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
    });
  } catch (err) {
    console.log(err);
  }

  //   //   if (!process.env.MONGO_URI) {
  //   //     throw new Error('MONGO_URI must be defined');
  //   //   }
  //   try {
  //     // await mongoose.connect(process.env.MONGO_URI!);
  //     // console.log('Connected to Mongo');
  //   } catch (err) {
  //     console.error(err);
  //   }
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
