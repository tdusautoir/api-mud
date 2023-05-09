import User, { IUserModel } from '../models/User';
import { Request, Response } from 'express';
import * as UserService from '../services/user.service'

const getUsers = async (req: Request, res: Response) => {
    
    const users: IUserModel[] = await UserService.findAll();

    if(users.length > 0)
    {
        return res.status(200).json(users);
    }
    else{
        return res.status(404).json({ "message": "No users found"})
    }   

};

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user: IUserModel | null | undefined = await UserService.findById(userId);

    if(user)
    {
        return res.status(200).json(user);
    }
    else{
        return res.status(404).json({ "message": "No user found for id " + userId })
    }
}

const getUserByUsername = async (req: Request, res: Response) => {
    const username = req.params.username;
    const user: IUserModel | null = await UserService.findByUsername(username);

    if(user)
    {
        return res.status(200).json(user);
    }
    else{
        return res.status(404).json({ "message": "No user found for username " + username })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const model = req.body;
    const userId = req.params.userId;

    const user: IUserModel | null | undefined = await UserService.findById(userId);

    if(user)
    {
        const updateResult = await UserService.updateUser(userId, model);

        if(updateResult)
        {
            res.status(200).json({updateResult:updateResult})
        }
    }
    else {
        return res.status(404).json({ message: "Could not update : no user found for id " + userId })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user: IUserModel | null | undefined = await UserService.findById(userId);

    if(user)
    {
        const deleteResult = await UserService.deleteUser(userId);

        if(deleteResult)
        {
            res.status(200).json({deleteResult:deleteResult})
        }
    }
    else {
        return res.status(404).json({ message: "Could not delete : no user found for id " + userId })
    }
}

export { 
    getUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
 };
