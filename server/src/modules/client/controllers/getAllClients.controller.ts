import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAllClientsService } from '../services/getAllClients.service';

export class GetAllClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllClientsService = container.resolve(GetAllClientsService);

    const client = await getAllClientsService.execute();

    return response.json(client);
  }
}
