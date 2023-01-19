import { Router } from 'express';
import { AuthController } from '../../../modules/account/controllers/auth.controller';
import { CreateAccountController } from '../../../modules/account/controllers/createAccount.controller';
import { LoginController } from '../../../modules/account/controllers/login.controller';
import { LogoutController } from '../../../modules/account/controllers/logout.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const createAccountController = new CreateAccountController();
const loginController = new LoginController();
const logoutController = new LogoutController();
const authController = new AuthController();

export const accountRouter = Router();

accountRouter.post('/signup', createAccountController.handle);
accountRouter.post('/login', loginController.handle);
accountRouter.get('/logout', logoutController.handle);
accountRouter.get('/', AuthMiddleware, authController.handle);
