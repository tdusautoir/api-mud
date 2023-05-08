import { Document } from "mongoose";
import User, { IUserModel } from "../models/User";
import * as ConfirmationService from '../services/confirmation.service'

export const findAll = async (): Promise<IUserModel[]> => {
    return User.find();
}

export const findById = async (id: String): Promise<IUserModel | null | undefined> => {
    return User.findById(id);
}

export const findByEmail = async (inEmail: String): Promise<IUserModel | null> => {
    return User.findOne({email:inEmail});
}

export const updateUser = async (id: String, model: IUserModel): Promise<IUserModel | null> => {
    return User.findOneAndUpdate({_id: id}, model, {new: true});
}

export const deleteUser = async (id: String): Promise<IUserModel | null> => {
    return User.findByIdAndDelete(id);
}

export const createUser = async (user: Document) => {
    User.create(user)

    // Send confirmation
    await ConfirmationService.handleMailConfirmation(user._id);
}