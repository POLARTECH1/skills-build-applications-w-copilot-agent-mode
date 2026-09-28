import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, min: 0, required: true, default: 0 },
}, { timestamps: true })

export const LeaderboardEntry = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard')