import { NextFunction, Request, Response } from 'express';
import { UserUseCases } from '../../../application/use-cases/UserUseCases';
import { UserRepository } from '../../database/UserRepository';

const userRepository = new UserRepository();
const userUseCases = new UserUseCases(userRepository);

class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userUseCases.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userUseCases.getUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userUseCases.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userUseCases.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await userUseCases.deleteUser(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
