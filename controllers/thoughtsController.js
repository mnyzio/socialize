const { Thought } = require('../models');

module.exports = {
    // Get thoughts
    getThoughts(req, res) {
        res.json({ message:"I am in get thougths route" })
    },
};