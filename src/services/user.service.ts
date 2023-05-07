import User from "../models/User";

export const findAll = async (): Promise<Document[]> => {
    return User.find();
};