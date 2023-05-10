import express from 'express';
import controller from '../controllers/confirmation.controller';

const router = express.Router();

router.get('/verify/:hash', controller.verifyEmail);

export default router;