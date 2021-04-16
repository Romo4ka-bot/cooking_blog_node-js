const express = require('express');
const Owner = require('../models/owner');
const bcrypt = require('bcryptjs');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('login', {
        title: 'Login',
        isHeader: true,
        error: req.flash('error'),
    });
});

router.post('/', async (req, res) => {
    try {
        const {email, pass} = req.body;
        const candidate = await Owner.findOne({ email });

        if (candidate) {
            const matchPass = await bcrypt.compare(pass, candidate.password);

            if (matchPass) {
                req.session.owner = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                });
            } else {
                req.flash('error', 'Неверный пароль');
                res.redirect('/login')
            }
        } else {
            req.flash('error', 'Такого пользователя не существует');
            res.redirect('/login')
        }
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;