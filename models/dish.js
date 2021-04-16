const {Schema, model} = require('mongoose');

const dish = new Schema({
    imgUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    ingredient: [
        {
            type: String
        }
    ],
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    }
});

module.exports = model('Dish', dish);