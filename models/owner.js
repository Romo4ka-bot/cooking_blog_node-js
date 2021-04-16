const {Schema, model} = require('mongoose');

const ownerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    second_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number
});

ownerSchema.method('toClient', function() {
    const owner = this.toObject();

    owner.id = owner._id;
    delete owner._id;

    return owner
});

module.exports = model('Owner', ownerSchema);