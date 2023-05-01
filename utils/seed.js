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

    // get all newly created users 
    // const allUsers = await User.find();
    // console.table(allUsers)

    // Populate thoughts for each user
    // await populateThoughts(allUsers);
    await populateThoughts(users);

    // Populate users and their friends
    // await populateUsers(allUsers);
    await populateUsers(users);

    //todo Populate reactions

    console.info('Seeding complete! 🌱');
    process.exit(0);
});