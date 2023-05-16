import mongoose, { Schema, Document } from 'mongoose';

export interface IConfirmation {
    userId: string;
    code: string;
}

export interface IConfirmationModel extends Document, IConfirmation {}

const ConfirmationSchema: Schema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

export const ConfirmationModel = mongoose.model<IConfirmationModel>('Confirmation', ConfirmationSchema);

export default ConfirmationModel;