const { User } = require('../models/');


module.exports = {
    // Get all users
    getUsers(req, res) {
        console.log("I am in the users get route")
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
};