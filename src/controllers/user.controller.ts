import User, { IUserModel } from '../models/User';
import { Request, Response } from 'express';
import * as UserService from '../services/user.service'
import { MudStatusCode } from '../helpers/constants';

const getUsers = async (req: Request, res: Response) => {
    const users: IUserModel[] = await UserService.findAll();

    if (users.length > 0) {
        return res.status(MudStatusCode.OK).json(users);
    } 
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({ message: 'No users found' });
    }
};

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user: IUserModel | null | undefined = await UserService.findById(userId);

    if (user) {
        return res.status(MudStatusCode.OK).json(user);
    } 
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({ message: 'No user found for id ' + userId });
    }
};

const getUserByUsername = async (req: Request, res: Response) => {
    const username = req.params.username;
    const user: IUserModel | null = await UserService.findByUsername(username);

    if (user) {
        return res.status(MudStatusCode.OK).json(user);
    } 
    else {
        return res.status(MudStatusCode.NOT_FOUND).json({ message: 'No user found for username ' + username });
    }
};

const updateUser = async (req: Request, res: Response) => {
    const model = req.body;
    const userId = req.params.userId;

    const updateResult = await UserService.updateUser(userId, model);

    return res.status(updateResult.returnCode!).json({
        success: updateResult.success,
        message: updateResult.errorMessage,
        object: updateResult.resultObject
    });
};

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const deleteResult = await UserService.deleteUser(userId)

    return res.status(deleteResult.returnCode!).json({
        success: deleteResult.success,
        message: deleteResult.errorMessage,
        object: deleteResult.resultObject
    })
};

export { 
    getUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
 };
