import express from 'express';
import controller from '../controllers/gamemodeStats.controller';

const router = express.Router();

router.get('/', controller.getAllGamemodeStats);
router.get('/:userId', controller.getGamemodeStatsByUserId);
router.get('/:statsId', controller.getGamemodeStatsById);


export default router;