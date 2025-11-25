import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.get('/userList', userController.getAllUsers);
router.delete('/deleteUser/:id', userController.deleteUser);
router.put('/updateUser/:id', userController.updateUser);

export default router;