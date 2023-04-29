const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlenght: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,            
            default: Date.now(),
            //todo Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },        
        //todo validate this is correct
        reactions: [reactionSchema]       
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

//todo Use a getter method to format the timestamp on query
// thoughtSchema.virtual('formatedDate').get(function () {
//     return this.createdAt
// })

//todo validate this is correct solution
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;