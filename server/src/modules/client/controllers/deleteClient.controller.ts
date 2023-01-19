import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteClientService } from '../services/deleteClient.service';

export class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClientService = container.resolve(DeleteClientService);

    await deleteClientService.execute({
      id,
    });

    return response.status(204).send();
  }
}
