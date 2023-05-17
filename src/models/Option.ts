import mongoose, { Schema, Document } from 'mongoose';

/**Gère les préférences des utilisateurs */
export interface IOption {
    userId: string;
    indicateur: string;
    choix: string;
}

export interface IOptionModel extends Document, IOption {}

const OptionSchema: Schema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    indicateur: {
        type: String,
        required: true
    },
    choix: {
        type: String,
        ref: "Parameter",
        required: true
    },
});

export const OptionModel = mongoose.model<IOptionModel>('Option', OptionSchema);

export default OptionModel;