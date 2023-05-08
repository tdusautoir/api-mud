import mongoose, { Schema, Document } from 'mongoose';

interface IConfirmation {
    userId: string;
    codeHash: string;
}

export interface IConfirmationModel extends Document, IConfirmation {}

const ConfirmationSchema: Schema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    codeHash: {
        type: String,
        required: true
    }
});

export const ConfirmationModel = mongoose.model('Confirmation', ConfirmationSchema);

export default ConfirmationModel;