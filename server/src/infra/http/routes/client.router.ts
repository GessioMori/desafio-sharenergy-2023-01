import { Router } from 'express';
import { CreateClientController } from '../../../modules/client/controllers/createClient.controller';
import { DeleteClientController } from '../../../modules/client/controllers/deleteClient.controller';
import { GetAllClientsController } from '../../../modules/client/controllers/getAllClients.controller';
import { GetClientController } from '../../../modules/client/controllers/getClient.controller';
import { UpdateClientController } from '../../../modules/client/controllers/updateClient.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const createClientController = new CreateClientController();
const getClientController = new GetClientController();
const getAllClientsController = new GetAllClientsController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

export const clientRouter = Router();

clientRouter.use(AuthMiddleware);
clientRouter.post('/', createClientController.handle);
clientRouter.get('/', getAllClientsController.handle);
clientRouter.get('/:id', getClientController.handle);
clientRouter.put('/:id', updateClientController.handle);
clientRouter.delete('/:id', deleteClientController.handle);
