const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts: {
            // Array of `_id` values referencing the `Thought` model
        },
        friends: {
            // Array of `_id` values referencing the `User` model (self-reference)
        }
        // Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
    }
);

const User = model('user', userSchema);

module.exports = User;