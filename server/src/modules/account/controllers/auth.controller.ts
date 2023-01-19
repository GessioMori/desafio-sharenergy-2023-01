import { Request, Response } from 'express';

export class AuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.accountId;
    return response.json({ user });
  }
}
