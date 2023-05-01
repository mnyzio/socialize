const { User, Thought } = require('../models');

const thoughtsData = [
    "Life is full of surprises, both good and bad.",
    "The world would be a better place if we all practiced more empathy.",
    "There's nothing quite like a good book to take you on an adventure.",
    "Success is often the result of hard work and perseverance.",
    "Music has the power to uplift our spirits and soothe our souls.",
    "Traveling is one of the best ways to broaden our perspectives and learn about different cultures.",
    "We should always strive to treat others with respect and kindness.",
    "The beauty of nature is something to be cherished and protected.",
    "Sometimes the best advice we can give ourselves is to just let go and trust the journey.",
    "Happiness is not a destination, it's a journey.",
    "We all have the ability to make a positive impact on the world around us.",
    "The universe has a way of working things out, even when we don't understand how.",
    "It's never too late to start something new and pursue your passions.",
    "Forgiveness is a powerful tool for both personal growth and healing.",
    "No matter what challenges we face, there is always hope.",
    "The little things in life are often the most meaningful.",
    "We should never underestimate the power of a kind word or gesture.",
    "Learning to embrace change is essential for personal growth and development.",
    "The people we surround ourselves with can have a huge impact on our lives.",
    "We should always strive to be the best versions of ourselves, while also accepting our imperfections."
]

//! function does not work as intended
//! working off of stack
function populateThoughts(allUsers) {
    // Add thoughts from each user
    allUsers.forEach((element) => {
        // console.log("🚀 ~ file: thoughtsSeed.js:31 ~ populateThoughts ~ element:", element)
        
        // Add two random thoughts from each user and update users thoughts array
        for (let i = 0; i < 2; i++){
            // Select random index from the array for thoughts
            let randomIndex = Math.floor(Math.random() * thoughtsData.length)            
            // Create thought and update users thought array
            Thought.create(
                {
                    "thoughtText": thoughtsData[randomIndex],
                    "username": element.username,            
                })
                .then((thought) => {
                    console.log(thought)
                    return User.findOneAndUpdate(
                        { _id: element._id },
                        { $addToSet: { thoughts: thought._id }},
                        { new: true }
                    )
                })
                .then(user => console.log(`Thought for ${user.username} updated`))
                .catch((err) => console.log(err));
            
            // Remove previously selected index from thoughts array
            thoughtsData.splice(randomIndex, 1);
        }        
    });
    return
}

module.exports = {
    populateThoughts,
}