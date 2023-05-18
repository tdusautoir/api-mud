import express from 'express';
import controller from '../controllers/gamemodeStats.controller';

const router = express.Router();

router.get('/', controller.getAllGamemodeStats);
router.get('/:userId', controller.getGamemodeStatsByUserId);
router.get('/:statsId', controller.getGamemodeStatsById);
router.get('/:userId/:gamemodeId', controller.getSpecificGamemodeStatsByUserId);

export default router;