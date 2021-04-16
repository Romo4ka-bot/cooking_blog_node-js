const Owner = require('../models/owner');

module.exports = async function(req, res, next) {
    if (!req.session.owner) {
        return next()
    }

    req.owner = await Owner.findById(req.session.owner._id);
    next()
};