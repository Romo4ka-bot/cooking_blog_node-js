const {Schema, model} = require('mongoose');

const donationSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = model('Donation', donationSchema);