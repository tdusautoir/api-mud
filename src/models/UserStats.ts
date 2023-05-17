import { number, required } from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

/**Statistiques de l'utilisateur */
export interface IUserStats {
    userId: string;
    playerRank: string;
    mpCount: number;
    playedSets: number;
    winSets: number;
    loseSets: number;
    playedGames: number;
    winGames: number;
    loseGames: number;
    winGamesSuccession: number;

    // Champs calculés
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
    playerRank: {
        type: String,
        ref: "Parameter",
        required: true
    },
    mpCount: {
        type: Number,
        required: true,
        default: 0
    },
    playedSets: {
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
    playedGames: {
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
    winSetsPercentage: {
        type: Number,
        required: true
    },
    winGamesPercentage: {
        type: Number,
        required: true
    }
});

export const UserStatsModel = mongoose.model<IUserStatsModel>('UserStats', UserStatsSchema);

export default UserStatsModel;