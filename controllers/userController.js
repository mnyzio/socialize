const { User, Thought } = require('../models/');


module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            // .populate({ path: 'friends', select: '-__v' })
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get single user by passing ID into query params
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate({ path: 'friends', select: '-__v' })            
            .populate({ path: 'thoughts', select: '-__v' })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.status(200).json(user)
            )
            .catch(err => res.status(500).json(err));
    },
    // Create user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Update user information by ID
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: { ...req.body } }, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete user
    // remove friends associations
    // remove associated thoughts
    deleteUser(req, res) {
        console.log("I am in the delete route")
        User.findOneAndDelete({ _id: req.params.userId })
            .then(async (user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with that ID' })
                } else {
                    // remove user from other users friends list
                    await User.updateMany(
                        { friends: user._id },
                        { $pull: { friends: user._id }},
                        { new: true }
                        ) 
                    // Remove thoughts associated with user
                    await Thought.deleteMany({ username: user.username })
                    res.json({ message: `User deleted, removed from other users friends lists. User's thought deleted`})
                }
            })
            .catch(err => res.status(500).json(err));
    },
    // Add friend
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.status(200).json(user)
            )
            .catch(err => res.status(500).json(err))
    },
    // Delete friend
    deleteFriend(req, res) {
        User.findByIdAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.status(200).json(user)
            )
            .catch(err => res.status(500).json(err));
    },
};