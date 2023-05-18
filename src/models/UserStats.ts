import { number, required } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

/**Statistiques de l'utilisateur */
export interface IUserStats {
    userId: string;
    playerRankId: string;
    mpCount: number;
    winSets: number;
    loseSets: number;
    winGames: number;
    loseGames: number;
    winGamesSuccession: number;

    // Champs calculés    
    playedSets: number;
    playedGames: number;
    winSetsPercentage: number;
    winGamesPercentage: number;
}

export interface IUserStatsModel extends Document, IUserStats {}

const UserStatsSchema: Schema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
        unique: true
    },
    playerRankId: {
        type: String,
        ref: "Parameter",
        required: true
    },
    mpCount: {
        type: Number,
        required: true,
        default: 0
    },
    winSets: {
        type: Number,
        required: true,
        default: 0
    },
    loseSets: {
        type: Number,
        required: true,
        default: 0
    },
    winGames: {
        type: Number,
        required: true,
        default: 0
    },
    loseGames: {
        type: Number,
        required: true,
        default: 0
    },
    winGamesSuccession: {
        type: Number,
        required: true,
        default: 0
    },
    // Champs calculés dans le back
    playedSets: {
        type: Number,
        required: true,
        default: 0
    },
    playedGames: {
        type: Number,
        required: true,
        default: 0
    },
    winSetsPercentage: {
        type: Number,
        required: true,
        default: 0
    },
    winGamesPercentage: {
        type: Number,
        required: true,
        default: 0
    }    
},
{ timestamps: true }
);

export const UserStatsModel = mongoose.model<IUserStatsModel>('UserStats', UserStatsSchema);

export default UserStatsModel;