const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');
const auth = require('../middleware/auth');

/* GET home page. */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const dish = await Dish.findById(id).populate('ownerId', 'first_name second_name email');

    console.log(dish);

    res.render('single_dish', {
        title: 'Single Dish',
        dish: dish.toObject()
    })

});

router.post('/:id/delete', auth, async (req, res) => {
    const id = req.params.id;

    const dish = await Dish.findById(id);

    if (req.session.owner._id.toString() === dish.ownerId._id.toString()) {
        await dish.remove();
        req.flash('info', 'Ваше блюдо успешно удалено');
        res.redirect('/');

    } else {
        req.flash('error', 'Блюдо может удалять только создатель');
        res.redirect('/');
    }

});

module.exports = router;