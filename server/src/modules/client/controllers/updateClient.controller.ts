import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateClientService } from '../services/updateClient.service';

export class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phoneNumber, address } = request.body;

    const updateClientService = container.resolve(UpdateClientService);

    const client = await updateClientService.execute({
      id,
      name,
      email,
      phoneNumber,
      address,
    });

    return response.json(client);
  }
}
