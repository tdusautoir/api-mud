import express from 'express';
import controller from '../controllers/usersStats.controller';

const router = express.Router();

router.get('/', controller.getAllUserStats);
router.get('/:userId', controller.getUserStatsByUserId);
router.get('/:statsId', controller.getUserStatsById);
router.post('/:statsId', controller.updateUserStats);


export default router;