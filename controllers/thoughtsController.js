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
        Thought.findOne({ _id: req.params.thoughtId })
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
                // return User.findOneAndUpdate(
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id }},
                    { runValidators: true, new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Thought created, but found no user with that ID' })
                    : res.status(200).json(user)
            )
            .catch(err => res.status(500).json(err))
    },
    // Update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { ...req.body }},
            { runValidators: true, new: true }
            ).then((thought) => 
                !thought 
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.status(200).json(thought)
            )
            .catch(err => res.status(500).json(err))
    },
    // Delete thought by id    
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that Id'})
                } else {                    
                    res.status(200).json(thought)                    
                }
            }).
            catch (err => res.status(500).json(err));
    },
    // Add reaction to thought using POST to /api/thoughts/:thoughtId/reactions
    addReaction(req, res) {       
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
            )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that Id'})
                    : res.status(200).json(thought)                    
            })
            .catch (err => res.status(500).json(err));
    },
    // Delete reaction from thought using DELETE to /api/thoughts/:thoughtId/reactions/:reactionId
    // Source: https://stackoverflow.com/questions/25586901/how-to-find-document-and-single-subdocument-matching-given-criterias-in-mongodb
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId, reactions: { $elemMatch: { reactionId: req.params.reactionId }}},
            { $pull: { reactions: { reactionId: req.params.reactionId }}},            
            { new: true }
            )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'Reaction Id not associated with Tought Id'})
                    : res.status(200).json(thought)                    
            })
            .catch (err => res.status(500).json(err));
    },
};