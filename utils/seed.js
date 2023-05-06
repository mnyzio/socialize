const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { populateThoughts } = require('./thoughtsSeed');
const { users, populateUsers } = require('./userSeed');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    await User.collection.insertMany(users);
    console.table(users);

    // Populate thoughts for each user
    // Popolate reaction for each thought
    await populateThoughts(users);

    // Populate users and their friends    
    await populateUsers(users);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});