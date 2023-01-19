import { config } from 'dotenv';
import { connect, set } from 'mongoose';
import { app } from './app';

const startServer = async () => {
  config();

  const PORT = process.env.PORT || 3333;

  const CONNECTION_URI =
    process.env.ENVIRONMENT === 'production'
      ? process.env.MONGO_PROD_URI
      : process.env.MONGO_DEV_URI;

  if (!CONNECTION_URI) {
    throw new Error('No connection URL provided.');
  }

  set('strictQuery', true);

  connect(CONNECTION_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

startServer();
