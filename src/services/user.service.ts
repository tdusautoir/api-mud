import User, { IUserModel } from '../models/User';
import { CreateUserResult, DeleteUserResult, UpdateUserResult } from '../models/results/userResults';
import * as ConfirmationService from '../services/confirmation.service';
import { MudStatusCode } from '../constants/statusCodes';

export const findAll = async (): Promise<IUserModel[]> => {
    return User.find();
};

export const findById = async (id: string): Promise<IUserModel | null | undefined> => {
    return User.findById(id);
};

export const findByEmail = async (inEmail: string): Promise<IUserModel | null> => {
    return User.findOne({ email: { $regex: new RegExp(inEmail, 'i') } });
};

export const findByUsername = async (inName: string): Promise<IUserModel | null> => {
    return User.findOne({ username: { $regex: new RegExp(inName, 'i') } });
};

export const updateUser = async (id: string, model: IUserModel): Promise<UpdateUserResult> => {
    const user = findById(id);

    if (!user) {
        return new UpdateUserResult(false, `Could not find user with id ${id}`, MudStatusCode.NOT_FOUND);
    }

    User.findOneAndUpdate({ _id: id }, model, { new: true });

    const updatedUser = await findById(id);

    if (!updatedUser) {
        return new UpdateUserResult(false, `Coud not find updated user (id: ${id})`, MudStatusCode.NOT_FOUND);
    }

    return new UpdateUserResult(true, undefined, MudStatusCode.OK, updatedUser);
};

export const deleteUser = async (id: string): Promise<DeleteUserResult> => {
    const user = findById(id);

    if (!user) {
        return new DeleteUserResult(false, `Could not find user with id ${id}`, MudStatusCode.NOT_FOUND);
    }

    User.findByIdAndDelete(id);

    const deletedUser = await findById(id);

    if (deletedUser) {
        return new DeleteUserResult(false, `User ${id} still exists`, MudStatusCode.BAD_REQUEST);
    }

    return new DeleteUserResult(true, undefined, MudStatusCode.OK);
};

export const createUser = async (user: IUserModel): Promise<CreateUserResult> => {
    const existingUser = await findByUsername(user.username);

    if (existingUser) {
        return new CreateUserResult(false, `Username already exists`, MudStatusCode.BAD_REQUEST);
    }

    User.create(user);
    const createdUser = findByUsername(user.username);

    if (!createdUser) {
        return new CreateUserResult(false, `Error creating user`, MudStatusCode.BAD_REQUEST, user);
    }

    // Send confirmation
    const createConfResult = await ConfirmationService.createUserAndConfirmation(user._id);

    if (!createConfResult.success) {
        return new CreateUserResult(false, createConfResult.errorMessage, createConfResult.returnCode, createConfResult.resultObject);
    }

    return new CreateUserResult(true, undefined, MudStatusCode.CREATED, createdUser);
};
