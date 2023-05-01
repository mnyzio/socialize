const { User } = require('../models');

users = [
    {
        "username": "crazyowl123",
        "email": "crazyowl123@example.com"
    },
    {
        "username": "happysquirrel789",
        "email": "happysquirrel789@example.com"
    },
    {
        "username": "giganticsnake456",
        "email": "giganticsnake456@example.com"
    },
    {
        "username": "sillypenguin234",
        "email": "sillypenguin234@example.com"
    },
    {
        "username": "curiousfox567",
        "email": "curiousfox567@example.com"
    },
    {
        "username": "funnyelephant890",
        "email": "funnyelephant890@example.com"
    },
    {
        "username": "clevermonkey321",
        "email": "clevermonkey321@example.com"
    },
    {
        "username": "friendlybear678",
        "email": "friendlybear678@example.com"
    },
    {
        "username": "playfulcat345",
        "email": "playfulcat345@example.com"
    },
    {
        "username": "sleepysloth912",
        "email": "sleepysloth912@example.com"
    }
]


async function populateUsers(allUsers) {
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
            {
                $addToSet: {
                    friends: [
                        allUsers[selectedIndexes[0]],
                        allUsers[selectedIndexes[1]],
                        allUsers[selectedIndexes[2]],
                    ]
                }
            },
            { runValidators: true, new: true }
        )
    }
    return
}

module.exports = { users, populateUsers };