import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginService } from '../services/login.service';

export class LoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password, keepLoggedIn } = request.body;

    const loginService = container.resolve(LoginService);

    const account = await loginService.execute({
      password,
      username,
    });

    return response
      .status(200)
      .cookie('userId', account._id, {
        signed: true,
        sameSite: 'none',
        secure: true,
        maxAge: keepLoggedIn ? 1000 * 60 * 60 * 24 * 7 : undefined, // 7 days
      })
      .send();
  }
}
