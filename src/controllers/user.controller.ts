import User, { IUser } from '../models/User';
import { Request, Response } from 'express';
import * as UserService from '../services/user.service'

const getUsers = async (req: Request, res: Response) => {
    
    const users: IUser[] = await UserService.findAll();

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
    const user: IUser | null | undefined = await UserService.findById(userId);

    if(user)
    {
        return res.status(200).json(user);
    }
    else{
        return res.status(404).json({ "message": "No user found for id " + userId })
    }
}

const updateUser = async (req: Request, res: Response) => {
    const model = req.body;
    const userId = req.params.userId;

    const user: IUser | null | undefined = await UserService.findById(userId);

    if(user)
    {
        const updateResult = await UserService.update(userId, model);

        if(updateResult)
        {
            res.status(200).json({updateResult:updateResult})
        }
    }
    else {
        return res.status(404).json({ message: "Could not update : no user found for id " + userId })
    }
}

export { 
    getUsers,
    getUserById,
    updateUser
 };
