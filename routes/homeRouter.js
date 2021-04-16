const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');

/* GET home page. */
router.get('/', async (req, res) => {

    const dishes = await Dish.find();

    for (let i = 0; i < dishes.length; i++) {
        dishes[i] = dishes[i].toObject();
    }

    res.render('home', {
        title: 'Home',
        error: req.flash('error'),
        info: req.flash('info'),
        dishes: dishes
    });
});


module.exports = router;