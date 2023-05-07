import User, { IUser } from "../models/User";

export const findAll = async (): Promise<IUser[]> => {
    return User.find();
};

export const findById = async (id: String): Promise<IUser | null | undefined> => {
    return User.findById(id);
}

export const updateUser = async (id: String, model: IUser): Promise<IUser | null> => {
    return User.findOneAndUpdate({_id: id}, model, {new: true});
}

export const deleteUser = async (id: String): Promise<IUser | null> => {
    return User.findByIdAndDelete(id);
}
