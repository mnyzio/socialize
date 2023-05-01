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
    // Get a single thought by id
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .populate({ path: 'reactions', select: '-__v' })
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.status(200).json(thought)
            )
            .catch(err => res.status(500).json(err));
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
    //todo Update thought by id
    updateThought(req, res) {

    },
    // Delete thought by id
    //todo delete all reacions associated with that thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that Id'})
                } else {
                    // Delete thought for now
                    res.status(200).json(thought)
                    //todo remove reacions associated with that thought 
                }
            })
    },
    //todo add reacion to thought using POST to /api/thoughts/:thoughtId/reactions
    //todo deleted reacion from thought using DELETE to /api/thoughts/:thoughtId/reactions
};