const { Thought, User } = require('../models');


module.exports = {
    // Get thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => {
                res.status(200).json(thoughts)
            })
            .catch((err) => res.status(500).json(err))
    },
    // Create thought
    createThought(req, res) {
        Thought.create(req.body)            
            .then((thought) => {
                // find user with id passed in the req.body.userId
                // Add thought to users thoughts array
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id }},
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Thought created, but found no user with that ID' })
                    : res.status(200).json(user)
            )
            .catch(err => res.status(500).json(err))
    },
};