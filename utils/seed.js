const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users } = require('./userSeed');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    await User.collection.insertMany(users);
    console.table(users);

    // get all newly created users 
    const allUsers = await User.find();

    // Add three random friends to each users    
    for (let i = 0; i < allUsers.length; i++) {
        const currentIndex = i;
        const selectedIndexes = [];

        // Randomly select 3 indexes from allUsers array 
        // Current user cannot be included in the array and each index needs to be unique
        while (selectedIndexes.length < 3) {
            const randomIndex = Math.floor(Math.random() * allUsers.length);
            if (randomIndex !== currentIndex) {
                if (!selectedIndexes.includes(randomIndex)) {
                    selectedIndexes.push(randomIndex);
                };
            };
        }

        // find each user and update its friends array
        await User.findOneAndUpdate(
            { _id: allUsers[i]._id },
            { $addToSet: { friends: [
                allUsers[selectedIndexes[0]],               
                allUsers[selectedIndexes[1]],               
                allUsers[selectedIndexes[2]],                               
                ]  
            }},
            { runValidators: true, new: true }
        )
    }
    
    console.info('Seeding complete! 🌱');
    process.exit(0);
});