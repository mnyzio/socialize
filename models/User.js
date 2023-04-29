const { Schema, model } = require('mongoose');

const userSchema = new Schema(
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
            lowercase: true,
            // Must match a valid email address (look into Mongoose's matching validation)
            //! Work on better e-mail validator
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                'Please add a valid email address',
            ],
        },
        // thoughts: [
        //     // Array of `_id` values referencing the `Thought` model
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Thought',
        //     },
        // ],
        // friends: [
        //     // Array of `_id` values referencing the `User` model (self-reference)
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'User',
        //     },
        // ],
    },
    // {
    //     toJSON: {
    //         getters: true,
    //     },
    // }
);

// a virtual called `friendCount` that retrieves the count of the user's `friends`
// userSchema
//     .virtual('friendCount')
//     .get(function () {
//         // Complete aggregate funciton
//         return this.aggregate([
//             {
//                 $unwind: '$friends',
//             },
//             {
//                 $group: {
//                     //   _id: ObjectId: ObjectId(this._id),
//                     _id: null,
//                     friendsCount: {
//                         $sum: 1
//                     }
//                 },
//             },
//         ]);
//     })


const User = model('user', userSchema);

module.exports = User;