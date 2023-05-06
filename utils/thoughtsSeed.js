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
];

const reactionsData = [
    {
        "username": "crazyowl123",
        "reactionBody": "I completely agree with your post. It's so important to practice empathy and treat others with kindness."
    },
    {
        "username": "crazyowl123",
        "reactionBody": "Your post has inspired me to take action and make a change in my own life. Thank you for the motivation."
    },
    {
        "username": "happysquirrel789",
        "reactionBody": "I think your post raises some interesting points, but I also believe that sometimes hard work and determination can be just as important as natural talent."
    },
    {
        "username": "happysquirrel789",
        "reactionBody": "I can relate to what you shared in your post, and it's comforting to know that I'm not alone in feeling this way."
    },
    {
        "username": "giganticsnake456",
        "reactionBody": "I appreciate your perspective on this topic. I've never thought about it that way before."
    },
    {
        "username": "giganticsnake456",
        "reactionBody": "I disagree with your post, but I still think it's important to have these discussions and hear different perspectives."
    },
    {
        "username": "sillypenguin234",
        "reactionBody": "I'm not sure I agree with everything in your post, but I respect your opinion and appreciate the thought you put into it."
    },
    {
        "username": "sillypenguin234",
        "reactionBody": "Your post has made me think more deeply about this topic, and I appreciate the opportunity to reflect on it."
    },
    {
        "username": "curiousfox567",
        "reactionBody": "Your post really resonated with me. I've been struggling with the same issue, and your words were exactly what I needed to hear."
    },
    {
        "username": "curiousfox567",
        "reactionBody": "I appreciate your honesty and vulnerability in your post. It takes a lot of courage to share personal experiences like that."
    },
    {
        "username": "funnyelephant890",
        "reactionBody": "Your post has given me a new perspective on this issue. Thank you for sharing your thoughts."
    },
    {
        "username": "funnyelephant890",
        "reactionBody": "Your post has made me more aware of my own biases and assumptions, and I think that's a valuable lesson to learn."
    },
    {
        "username": "clevermonkey321",
        "reactionBody": "I think your post highlights the importance of being open-minded and willing to consider different points of view."
    },
    {
        "username": "clevermonkey321",
        "reactionBody": "I think your post raises some important questions that we should all be asking ourselves. Thank you for starting this conversation."
    },
    {
        "username": "friendlybear678",
        "reactionBody": "I appreciate how you explained your reasoning and provided examples to support your argument."
    },
    {
        "username": "friendlybear678",
        "reactionBody": "Your post has given me hope for the future. It's inspiring to see people like you working towards positive change."
    },
    {
        "username": "playfulcat345",
        "reactionBody": "Your post reminded me of a similar experience I had, and it's comforting to know that others have gone through similar situations."
    },
    {
        "username": "playfulcat345",
        "reactionBody": "I found your post to be very informative and well-researched. It's clear that you put a lot of time and effort into it."
    },
    {
        "username": "sleepysloth912",
        "reactionBody": "I think your post brings up some valid concerns, and it's important to address these issues in a constructive way."
    },
    {
        "username": "sleepysloth912",
        "reactionBody": "I think your post is a great reminder that we should all strive to be more compassionate and understanding towards one another."
    }
];

// Thoughts seed
function populateThoughts(allUsers) {
    // Add thoughts from each user
    allUsers.forEach((element) => {
        // Add two random thoughts from each user and update users thoughts array
        for (let i = 0; i < 2; i++){
            // Select random index from the array for thoughts
            let randomIndex = Math.floor(Math.random() * thoughtsData.length)            
            // Create thought with reactions and update users thought array
            Thought.create(
                {
                    "thoughtText": thoughtsData[randomIndex],
                    "username": element.username,
                    "reactions": reactionsData[randomIndex],            
                })
                .then((thought) => {
                    return User.findOneAndUpdate(
                        { _id: element._id },
                        { $addToSet: { thoughts: thought._id }},
                        { new: true }
                    )
                })
                .then(user => console.log(`Thought for ${user.username} updated`))
                .catch((err) => console.log(err));
            
            // Remove previously selected index from thoughts array and reactions array
            thoughtsData.splice(randomIndex, 1);
            reactionsData.splice(randomIndex, 1);
        }        
    });
    return
}

module.exports = {
    populateThoughts,
}