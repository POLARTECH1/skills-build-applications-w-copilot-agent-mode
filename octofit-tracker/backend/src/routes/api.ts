import { Router } from 'express'
import { Activity } from '../models/Activity.js'
import { LeaderboardEntry } from '../models/Leaderboard.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

export const apiRouter = Router()

apiRouter.get('/users/', async (_request, response) => {
  response.json(await User.find().populate('team').sort({ name: 1 }))
})
apiRouter.post('/users/', async (request, response) => {
  response.status(201).json(await User.create(request.body))
})

apiRouter.get('/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }))
})
apiRouter.post('/teams/', async (request, response) => {
  response.status(201).json(await Team.create(request.body))
})

apiRouter.get('/activities/', async (request, response) => {
  const filter = request.query.user ? { user: request.query.user } : {}
  response.json(await Activity.find(filter).populate('user').sort({ completedAt: -1 }))
})
apiRouter.post('/activities/', async (request, response) => {
  response.status(201).json(await Activity.create(request.body))
})

apiRouter.get('/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().populate('user').sort({ points: -1 }).limit(100))
})
apiRouter.post('/leaderboard/', async (request, response) => {
  response.status(201).json(await LeaderboardEntry.create(request.body))
})

apiRouter.get('/workouts/', async (request, response) => {
  const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {}
  response.json(await Workout.find(filter).sort({ difficulty: 1, title: 1 }))
})
apiRouter.post('/workouts/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body))
})