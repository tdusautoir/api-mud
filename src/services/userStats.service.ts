import { MudStatusCode, RANK_BAD, RANK_KEY } from "../helpers/constants";
import UserStats, { IUserStatsModel } from "../models/UserStats"
import { CreateUserStatsResult } from "../models/results/userStats.results";
import * as ParamService from "../services/parameter.service"
import * as UserService from "../services/user.service"

export const getAllUserStats = async (): Promise<IUserStatsModel[]> => {
    return await UserStats.find();
};

export const getUserStatsByUserId = async (userId: string): Promise<IUserStatsModel | null> => {
    return await UserStats.findOne({ userId: userId});
};

export const createUserStats = async (userId: string): Promise<CreateUserStatsResult> => {
    // Vérif du userId
    const user = await UserService.findById(userId);

    if(!user) {
        return new CreateUserStatsResult(false, `Could not find user ${userId}`, MudStatusCode.NOT_FOUND);
    }

    // Vérif qu'il n'existe pas déjà
    const existingStats = await getUserStatsByUserId(userId);

    if(existingStats) {
        return new CreateUserStatsResult(false, `Stats already exists for user ${userId}`, MudStatusCode.BAD_REQUEST);
    }

    // Récupération du rang de base
    const lowestRank = await ParamService.getSpecificParameter(RANK_KEY, RANK_BAD);

    if(!lowestRank) {
        return new CreateUserStatsResult(false, `Error creating user stats : rank not found`, MudStatusCode.NOT_FOUND);
    }

    // Création
    const newStats = new UserStats({
        userId: userId,
        playerRank: lowestRank
    });

    await UserStats.create(newStats);

    // Vérif 
    const createdStats = await getUserStatsByUserId(userId);

    if(!createdStats) {
        return new CreateUserStatsResult(false, `Could not find newly created user stats for user ${userId}`, MudStatusCode.NOT_FOUND);
    }

    return new CreateUserStatsResult(true, undefined, MudStatusCode.CREATED, createdStats);    
}