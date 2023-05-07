import mongoose, { Schema, Document } from 'mongoose';

export interface IPicture {
    path: string;
}

export interface IPictureModel extends Document, IPicture {}

const PictureSchema: Schema = new Schema(
    {
        path: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

export const PictureModel = mongoose.model<IPictureModel>('Picture', PictureSchema);

export default PictureModel;
