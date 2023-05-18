import mongoose, { Schema, Document } from 'mongoose';

/**Stats d'un utilisateur pour un mode de jeu précis */
export interface IGamemodeStats {
    userId: string;
    gamemode: string;
    playedMatches: number;
    victoryCount: number;
    defeatCount: number;
}

export interface IGamemodeStatsModel extends Document, IGamemodeStats {}

const GamemodeStatsSchema: Schema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    gamemode: {
        type: String,
        ref: "Parameter",
        required: true
    },
    mpCount: {
        type: Number,
        required: true,
        default: 0
    },
    playedMatches: {
        type: Number,
        required: true,
        default: 0
    },
    victoryCount: {
        type: Number,
        required: true,
        default: 0
    },
    defeatCount: {
        type: Number,
        required: true,
        default: 0
    }
},
{ timestamps: true }
);

export const GamemodeStatsModel = mongoose.model<IGamemodeStatsModel>('GamemodeStats', GamemodeStatsSchema);

export default GamemodeStatsModel;