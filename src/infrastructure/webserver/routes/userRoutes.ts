import { Router } from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, UserController.createUser);
router.get('/', authMiddleware, UserController.getUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

export default router;
