import { MudStatusCode } from "../helpers/constants";
import GamemodeStats, { IGamemodeStatsModel } from "../models/GamemodeStats";
import { CreateGamemodeStatsResult, UpdateGamemodeStatsResult } from "../models/results/gamemodeStats.results";
import * as ParamService from "../services/parameter.service";

export const getAllGamemodeStats = async (): Promise<IGamemodeStatsModel[]> => {
    return await GamemodeStats.find();
};

export const getGamemodeStatsByUserId = async (userId: string): Promise<IGamemodeStatsModel | null> => {
    return await GamemodeStats.findOne({ userId: userId});
};

export const getGamemodeStatsById = async (statsId: string): Promise<IGamemodeStatsModel | null> => {
    return await GamemodeStats.findById(statsId);
};

export const createGamemodeStats = async (userId: string, gamemodeId: string): Promise<CreateGamemodeStatsResult> => {
    // Vérif du userId
    const user = await GamemodeStats.findById(userId);

    if(!user) {
        return new CreateGamemodeStatsResult(false, `Could not find user ${userId}`, MudStatusCode.NOT_FOUND);
    }

    // Vérif qu'il n'existe pas déjà
    const existingStats = await getGamemodeStatsByUserId(userId);

    if(existingStats) {
        return new CreateGamemodeStatsResult(false, `Gamemode stats already exist for user ${userId}`, MudStatusCode.BAD_REQUEST);
    }

    // Vérif du gamemode
    const gamemode = await ParamService.getParameterById(gamemodeId);

    if(!gamemode) {
        return new CreateGamemodeStatsResult(false, `Error creating gamemode stats : gamemode not found`, MudStatusCode.NOT_FOUND);
    }

    // Création
    const newStats = new GamemodeStats({
        userId: userId,
        gamemodeId: gamemode._id
    });

    const result = await GamemodeStats.create(newStats);
    console.log(result);

    // Vérif 
    const createdStats = await getGamemodeStatsByUserId(userId);

    if(!createdStats) {
        return new CreateGamemodeStatsResult(false, `Could not find newly created gamemode stats for user ${userId}`, MudStatusCode.NOT_FOUND);
    }

    return new CreateGamemodeStatsResult(true, undefined, MudStatusCode.CREATED, createdStats);    
};

export const updateGamemodeStats = async (statsId: string, model: IGamemodeStatsModel): Promise<UpdateGamemodeStatsResult> => {
    const userStats = await getGamemodeStatsById(statsId);

    if (!userStats) {
        return new UpdateGamemodeStatsResult(false, `Could not find gamemode stats to update with id ${statsId}`, MudStatusCode.NOT_FOUND);
    }

    await GamemodeStats.findOneAndUpdate({ _id: statsId }, model, { new: true });

    const updatedGamemodeStats = await getGamemodeStatsById(statsId);

    if (!updatedGamemodeStats) {
        return new UpdateGamemodeStatsResult(false, `Coud not find updated gamemode stats (id: ${statsId})`, MudStatusCode.NOT_FOUND);
    }

    return new UpdateGamemodeStatsResult(true, undefined, MudStatusCode.OK, updatedGamemodeStats);
};
