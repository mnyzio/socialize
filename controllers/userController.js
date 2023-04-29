const { User } = require('../models/');


module.exports = {
    // Get all users
    getUsers(req, res) {
        console.log("I am in the users get route")
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get single user by passing ID into query params
    getSingleUser(req, res) {
        console.log(`In singe user route with user ID ${req.params.userId}`)
        User.findOne({ _id: req.params.userId })
            .select('-__v')            
            .then((user) =>                 
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })                
                    : res.status(200).json(user)
            )
            .catch (err => res.status(500).json(err));
    },
    // Create user
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },    
};