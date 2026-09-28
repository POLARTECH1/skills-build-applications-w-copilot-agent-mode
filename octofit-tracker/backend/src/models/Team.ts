import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true, default: '' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema)