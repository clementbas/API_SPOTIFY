import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.get('/list', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;