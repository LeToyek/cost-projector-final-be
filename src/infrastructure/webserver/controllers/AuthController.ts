import { NextFunction, Request, Response } from 'express';
import { UserUseCases } from '../../../application/use-cases/UserUseCases';
import jwtUtils from '../../../shared/utils/jwtUtils';
import { UserRepository } from '../../database/UserRepository';

const userRepository = new UserRepository();
const userUseCases = new UserUseCases(userRepository);

class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userUseCases.createUser(req.body);
            const token = jwtUtils.generateToken(user.id);
            res.status(201).json({ user, token });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userUseCases.authenticateUser(req.body.email, req.body.password);
            if (user) {
                const token = jwtUtils.generateToken(user.id);
                res.json({ user, token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
