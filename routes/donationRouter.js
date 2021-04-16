const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');

router.post('/', async (req, res) => {

    const price = req.body.price;

    if (price < 1) {
        req.flash('error', 'Донат не может быть неположительным');
        res.redirect('/');
    }

    const sessionOwner = req.session.owner;

    let email;

    if (sessionOwner) {

        email = sessionOwner.email;

    } else {

        email = req.body.email;
    }

    let donation = await Donation.findOne({email});

    if (donation) {

        donation.price += +price;

    } else {

        donation = new Donation({
            email,
            price
        })
    }

    await donation.save();

    req.flash('info', 'Спасибо, за донат!');
    res.redirect('/');
});


module.exports = router;