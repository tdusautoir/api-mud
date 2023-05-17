import mongoose, { Schema, Document } from 'mongoose';

/**Stats d'un utilisateur pour un perso précis*/
export interface ICharacterStats {
    userId: string;
    character: string;
    playedCount: number;
}

export interface ICharacterStatsModel extends Document, ICharacterStats {}

const CharacterStatsSchema: Schema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    character: {
        type: String,
        ref: "Parameter",
        required: true
    },
    playedCount: {
        type: Number,
        required: true,
        default: 0
    }
});

export const CharacterStatsModel = mongoose.model<ICharacterStatsModel>('CharacterStats', CharacterStatsSchema);

export default CharacterStatsModel;