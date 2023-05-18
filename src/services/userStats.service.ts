import { MudStatusCode, RANK_BAD, RANK_KEY } from "../helpers/constants";
import UserStats, { IUserStatsModel } from "../models/UserStats"
import { CreateUserStatsResult, UpdateUserStatsResult } from "../models/results/userStats.results";
import * as ParamService from "../services/parameter.service"
import * as UserService from "../services/user.service"

export const getAllUserStats = async (): Promise<IUserStatsModel[]> => {
    return await UserStats.find();
};

export const getUserStatsByUserId = async (userId: string): Promise<IUserStatsModel | null> => {
    return await UserStats.findOne({ userId: userId});
};

export const getUserStatsById = async (statsId: string): Promise<IUserStatsModel | null> => {
    return await UserStats.findById(statsId);
}

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
        playerRankId: lowestRank._id
    });

    await UserStats.create(newStats);

    // Vérif 
    const createdStats = await getUserStatsByUserId(userId);

    if(!createdStats) {
        return new CreateUserStatsResult(false, `Could not find newly created user stats for user ${userId}`, MudStatusCode.NOT_FOUND);
    }

    return new CreateUserStatsResult(true, undefined, MudStatusCode.CREATED, createdStats);    
}

export const updateUserStats = async (statsId: string, model: IUserStatsModel): Promise<UpdateUserStatsResult> => {
    const userStats = await getUserStatsById(statsId);

    if (!userStats) {
        return new UpdateUserStatsResult(false, `Could not find user stats to update with id ${statsId}`, MudStatusCode.NOT_FOUND);
    }

    const result = await UserStats.findOneAndUpdate({ _id: statsId }, model, { new: true });

    const updatedUserStats = await getUserStatsById(statsId);

    if (!updatedUserStats) {
        return new UpdateUserStatsResult(false, `Coud not find updated user stats (id: ${statsId})`, MudStatusCode.NOT_FOUND);
    }

    return new UpdateUserStatsResult(true, undefined, MudStatusCode.OK, updatedUserStats);
}