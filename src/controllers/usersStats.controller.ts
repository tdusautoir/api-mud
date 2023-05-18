import { Response, Request } from 'express';
import * as UserStatsService from '../services/userStats.service'
import { MudStatusCode } from '../helpers/constants';

const getAllUserStats = async (req: Request, res: Response) => {    
    const statsList = await UserStatsService.getAllUserStats();

    if(statsList.length > 0) {
        return res.status(MudStatusCode.OK).json(statsList);
    }
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No user stats found`});
    }
};

const getUserStatsByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const stats = await UserStatsService.getUserStatsByUserId(userId);

    if(!stats) {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No user stats found for user ${userId}`});
    }
    else {
        return res.status(MudStatusCode.OK).json(stats);
    }
};

const getUserStatsById = async (req: Request, res: Response) => {
    const statsId = req.params.statsId;

    const stats = await UserStatsService.getUserStatsById(statsId);

    if(!stats) {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No user stats found for id ${statsId}`});
    }
    else {
        return res.status(MudStatusCode.OK).json(stats);
    }
};

const updateUserStats = async (req: Request, res: Response) => {
    const model = req.body;
    const statsId = req.params.statsId;

    const updateResult = await UserStatsService.updateUserStats(statsId, model);

    return res.status(updateResult.returnCode!).json({
        success: updateResult.success,
        message: updateResult.errorMessage,
        object: updateResult.resultObject
    });
};

export default {
    getAllUserStats,
    getUserStatsByUserId,
    getUserStatsById,
    updateUserStats
}