import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const activitySchema = new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      schedule: { type: String, required: true },
      maxAttendance: { type: Number, required: true },
    });
    const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

    await Activity.updateOne(
      { name: 'Manga Maniacs' },
      {
        $set: {
          description:
            'Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
          schedule: 'Tuesdays at 7pm',
          maxAttendance: 15,
        },
      },
      { upsert: true },
    );

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
