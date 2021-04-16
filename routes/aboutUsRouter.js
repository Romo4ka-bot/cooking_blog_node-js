const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('about_us', {
        title: 'About Us'
    });
});


module.exports = router;