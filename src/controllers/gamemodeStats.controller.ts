import { Response, Request } from 'express';
import { MudStatusCode } from "../helpers/constants";
import * as GamemodeStatsService from "../services/gamemodeStats.service"

const getAllGamemodeStats = async (req: Request, res: Response) => {
    const statsList = await GamemodeStatsService.getAllGamemodeStats();

    if(statsList.length > 0) {
        return res.status(MudStatusCode.OK).json(statsList);
    }
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No gamemode stats found`});
    }
};

const getGamemodeStatsByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const stats = await GamemodeStatsService.getGamemodeStatsByUserId(userId);

    if(!stats) {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No gamemode stats found for user ${userId}`});
    }
    else {
        return res.status(MudStatusCode.OK).json(stats);
    }
};

const getGamemodeStatsById = async (req: Request, res: Response) => {
    const statsId = req.params.statsId;

    const stats = await GamemodeStatsService.getGamemodeStatsById(statsId);

    if(!stats) {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No gamemode stats found for id ${statsId}`});
    }
    else {
        return res.status(MudStatusCode.OK).json(stats);
    }
};

const getSpecificGamemodeStatsByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const gamemodeId = req.params.gamemodeId;    

    const stats = await GamemodeStatsService.getSpecificGamemodeStatsByUserId(userId, gamemodeId);

    if(!stats) {
        return res.status(MudStatusCode.NOT_FOUND).json({message: `No gamemode stats found for user ${userId} and gamemode ${gamemodeId}`});
    }
    else {
        return res.status(MudStatusCode.OK).json(stats);
    }
}; 

export default {
    getAllGamemodeStats,
    getGamemodeStatsByUserId,
    getGamemodeStatsById,
    getSpecificGamemodeStatsByUserId
}