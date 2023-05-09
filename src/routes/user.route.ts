import express from 'express';
import { getUserById, getUsers, updateUser, deleteUser, getUserByUsername } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById)
router.get('/:username', getUserByUsername)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router;
