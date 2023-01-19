import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetClientService } from '../services/getClient.service';

export class GetClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getClientService = container.resolve(GetClientService);

    const client = await getClientService.execute({
      id,
    });

    return response.json(client);
  }
}
