const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');
const auth = require('../middleware/auth');

/* GET home page. */
router.get('/', auth, (req, res) => {
    res.render('creator_dish');
});

router.post('/', auth, async (req, res) => {
    const {img_url: imgUrl, title, description, recipe, ingredient} = req.body;
    console.log(ingredient);
    const dish = new Dish({
        imgUrl,
        title,
        description,
        recipe,
        ingredient,
        ownerId: req.session.owner._id
    });

    try {
        await dish.save();
        res.redirect('/');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;