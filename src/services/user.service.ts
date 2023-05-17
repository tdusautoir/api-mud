import User, { IUserModel } from '../models/User';
import { CreateUserResult, DeleteUserResult, UpdateUserResult } from '../models/results/user.results';
import * as ConfirmationService from '../services/confirmation.service';
import { MudStatusCode } from '../helpers/constants';
import * as UserStatsService from "../services/userStats.service"

export const findAll = async (): Promise<IUserModel[]> => {
    return await User.find();
};

export const findById = async (id: string): Promise<IUserModel | null | undefined> => {
    return await User.findById(id);
};

export const findByEmail = async (inEmail: string): Promise<IUserModel | null> => {
    return await User.findOne({ email: { $regex: new RegExp(inEmail, 'i') } });
};

export const findByUsername = async (inName: string): Promise<IUserModel | null> => {
    return await User.findOne({ username: { $regex: new RegExp(inName, 'i') } });
};

export const updateUser = async (id: string, model: IUserModel): Promise<UpdateUserResult> => {
    const user = await findById(id);

    if (!user) {
        return new UpdateUserResult(false, `Could not find user to update with id ${id}`, MudStatusCode.NOT_FOUND);
    }

    const result = await User.findOneAndUpdate({ _id: id }, model, { new: true });

    const updatedUser = await findById(id);

    if (!updatedUser) {
        return new UpdateUserResult(false, `Coud not find updated user (id: ${id})`, MudStatusCode.NOT_FOUND);
    }

    return new UpdateUserResult(true, undefined, MudStatusCode.OK, updatedUser);
};

export const deleteUser = async (id: string): Promise<DeleteUserResult> => {
    const user = await findById(id);

    if (!user) {
        return new DeleteUserResult(false, `Could not find user with id ${id}`, MudStatusCode.NOT_FOUND);
    }

    await User.findByIdAndDelete(id);

    const deletedUser = await findById(id);

    if (deletedUser) {
        return new DeleteUserResult(false, `User ${id} still exists`, MudStatusCode.BAD_REQUEST);
    }

    return new DeleteUserResult(true, undefined, MudStatusCode.OK);
};

export const createUser = async (user: IUserModel): Promise<CreateUserResult> => {
    // Vérif sur nom
    const existingUsername = await findByUsername(user.username);

    if (existingUsername) {
        return new CreateUserResult(false, `Username already exists`, MudStatusCode.BAD_REQUEST);
    }

    // Vérif sur mail
    const existingUserEmail = await findByEmail(user.email);

    if(existingUserEmail) {
        return new CreateUserResult(false, `Email already used`, MudStatusCode.BAD_REQUEST);
    }

    // Création
    await User.create(user);
    const createdUser = await findByUsername(user.username);

    if (!createdUser) {
        return new CreateUserResult(false, `Error creating user: ${user.username} cannot be found`, MudStatusCode.BAD_REQUEST, user);
    }

    // Création des stats
    const createStatResult = await UserStatsService.createUserStats(createdUser._id);

    if (!createStatResult.success) {
        return new CreateUserResult(false, createStatResult.errorMessage, createStatResult.returnCode, createStatResult.resultObject);
    }

    // Send confirmation
    const createConfResult = await ConfirmationService.createUserAndConfirmation(user._id);

    if (!createConfResult.success) {
        return new CreateUserResult(false, createConfResult.errorMessage, createConfResult.returnCode, createConfResult.resultObject);
    }

    return new CreateUserResult(true, undefined, MudStatusCode.CREATED, createdUser);
};
