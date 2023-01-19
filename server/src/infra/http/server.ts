import { connect, set } from 'mongoose';
import { app } from './app';
import { env } from './../../utils/validators/env';

const startServer = async () => {
  const PORT = env.PORT;

  const CONNECTION_URI =
    env.ENVIRONMENT === 'production' ? env.MONGO_PROD_URI : env.MONGO_DEV_URI;

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
