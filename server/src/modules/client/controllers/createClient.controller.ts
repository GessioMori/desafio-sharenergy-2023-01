import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientService } from '../services/createClient.service';

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, address, phoneNumber } = request.body;

    const createClientService = container.resolve(CreateClientService);

    const newClient = await createClientService.execute({
      cpf,
      email,
      name,
      address,
      phoneNumber,
    });

    return response.status(201).json(newClient);
  }
}
