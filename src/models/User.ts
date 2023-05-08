import { boolean } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    active: boolean;
    picture_id?: string;
    favorite_characters?: Array<string>;
}

export interface IUserModel extends Document, IUser {}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 32,
            unique: true
        },
        firstname: {
            type: String,
            // required: true,
            maxlength: 32
        },
        lastname: {
            type: String,
            // required: true,
            maxlength: 32
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/
        },
        // Champ permettant de vérifier que l'adresse mail a été validée
        // Par défaut, l'utilisateur créé n'est pas actif tant qu'il n'a pas vérifié son adresse e-mail
        active: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
