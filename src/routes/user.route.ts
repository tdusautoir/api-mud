import express from 'express';
import { getUserById, getUsers, updateUser, deleteUser, getUserByUsername } from '../controllers/user.controller';
import { ValidateSchema, Schemas } from '../middleware/validateSchemas';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/name/:username', getUserByUsername);
router.patch('/:userId', ValidateSchema(Schemas.user.update), updateUser);
router.delete('/:userId', deleteUser)

export default router;
