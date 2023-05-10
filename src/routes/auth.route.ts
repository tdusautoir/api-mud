import express from "express";
import controller from '../controllers/auth.controller';
import { ValidateSchema, Schemas } from '../middleware/validateSchemas';

const router = express.Router();

router.post('/signin', ValidateSchema(Schemas.user.signin), controller.signin);
router.post('/signup', ValidateSchema(Schemas.user.signup), controller.signup);

export default router;