import express from 'express';
import { getUserById, getUsers, updateUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById)
router.patch('/:userId', updateUser)

export default router;
