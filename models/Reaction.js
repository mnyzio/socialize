const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    //todo elaborate
    {
        toJSON: {
            getters: true,            
        },
        id: false,
    }
);

//todo Use a getter method to format the timestamp on query
reactionSchema.virtual('formatedDate').get(function () {
    return dayjs(this.createdAt).format('DD/MM/YYYY')
})

module.exports = reactionSchema;