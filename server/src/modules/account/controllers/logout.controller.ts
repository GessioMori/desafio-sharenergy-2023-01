import { Request, Response } from 'express';

export class LogoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response
      .status(200)
      .cookie('userId', '', {
        signed: true,
        sameSite: 'none',
        secure: true,
      })
      .send();
  }
}
