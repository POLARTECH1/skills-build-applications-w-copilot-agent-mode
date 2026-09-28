import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const ids = {
  users: [
    new mongoose.Types.ObjectId('650000000000000000000001'),
    new mongoose.Types.ObjectId('650000000000000000000002'),
    new mongoose.Types.ObjectId('650000000000000000000003'),
    new mongoose.Types.ObjectId('650000000000000000000004'),
  ],
  teams: [
    new mongoose.Types.ObjectId('660000000000000000000001'),
    new mongoose.Types.ObjectId('660000000000000000000002'),
  ],
  activities: [
    new mongoose.Types.ObjectId('670000000000000000000001'),
    new mongoose.Types.ObjectId('670000000000000000000002'),
    new mongoose.Types.ObjectId('670000000000000000000003'),
    new mongoose.Types.ObjectId('670000000000000000000004'),
  ],
  workouts: [
    new mongoose.Types.ObjectId('680000000000000000000001'),
    new mongoose.Types.ObjectId('680000000000000000000002'),
    new mongoose.Types.ObjectId('680000000000000000000003'),
  ],
};

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const users = [
      { _id: ids.users[0], username: 'maya.chen', email: 'maya.chen@example.com', name: 'Maya Chen', team: ids.teams[0] },
      { _id: ids.users[1], username: 'jordan.lee', email: 'jordan.lee@example.com', name: 'Jordan Lee', team: ids.teams[0] },
      { _id: ids.users[2], username: 'sam.rivera', email: 'sam.rivera@example.com', name: 'Sam Rivera', team: ids.teams[1] },
      { _id: ids.users[3], username: 'alex.morgan', email: 'alex.morgan@example.com', name: 'Alex Morgan', team: ids.teams[1] },
    ];
    for (const user of users) {
      await User.updateOne({ _id: user._id }, { $set: user }, { upsert: true, runValidators: true });
    }

    const teams = [
      { _id: ids.teams[0], name: 'Comet Crew', description: 'A running and endurance team.', members: ids.users.slice(0, 2) },
      { _id: ids.teams[1], name: 'Tidal Force', description: 'A balanced team focused on steady progress.', members: ids.users.slice(2, 4) },
    ];
    for (const team of teams) {
      await Team.updateOne({ _id: team._id }, { $set: team }, { upsert: true, runValidators: true });
    }

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const activities = [
      { _id: ids.activities[0], user: ids.users[0], type: 'running', durationMinutes: 32, distanceKm: 4.8, points: 48, completedAt: new Date(now - day) },
      { _id: ids.activities[1], user: ids.users[1], type: 'strength', durationMinutes: 40, distanceKm: 0, points: 40, completedAt: new Date(now - 2 * day) },
      { _id: ids.activities[2], user: ids.users[2], type: 'walking', durationMinutes: 50, distanceKm: 3.6, points: 36, completedAt: new Date(now - 3 * day) },
      { _id: ids.activities[3], user: ids.users[3], type: 'running', durationMinutes: 25, distanceKm: 3.2, points: 32, completedAt: new Date(now - 4 * day) },
    ];
    for (const activity of activities) {
      await Activity.updateOne({ _id: activity._id }, { $set: activity }, { upsert: true, runValidators: true });
    }

    const leaderboard = [
      { user: ids.users[0], points: 248 },
      { user: ids.users[1], points: 210 },
      { user: ids.users[2], points: 184 },
      { user: ids.users[3], points: 156 },
    ];
    for (const entry of leaderboard) {
      await LeaderboardEntry.updateOne({ user: entry.user }, { $set: entry }, { upsert: true, runValidators: true });
    }

    const workouts = [
      { _id: ids.workouts[0], title: 'Easy interval run', description: 'Alternate a relaxed jog with short brisk intervals.', activityType: 'running', difficulty: 'beginner', durationMinutes: 25 },
      { _id: ids.workouts[1], title: 'Campus power walk', description: 'Keep a steady pace for a brisk walk around campus.', activityType: 'walking', difficulty: 'beginner', durationMinutes: 30 },
      { _id: ids.workouts[2], title: 'Bodyweight circuit', description: 'Complete three controlled rounds of squats, push-ups, and planks.', activityType: 'strength', difficulty: 'intermediate', durationMinutes: 35 },
    ];
    for (const workout of workouts) {
      await Workout.updateOne({ _id: workout._id }, { $set: workout }, { upsert: true, runValidators: true });
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
