import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAccountService } from '../services/createAccount.service';

export class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createAccountService = container.resolve(CreateAccountService);

    const newAccount = await createAccountService.execute({
      password,
      username,
    });

    return response.status(201).json(newAccount);
  }
}
