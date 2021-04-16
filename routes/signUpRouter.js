const express = require('express');
const Owner = require('../models/owner');
const bcrypt = require('bcryptjs');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('sign_up', {
        title: 'Sign Up',
        isHeader: true,
        error: req.flash('error')
    });
});

router.post('/', async (req, res) => {
    try {
        const {first_name, second_name, email, pass, confirm_pass, age} = req.body;

        if (pass.length < 4 || pass.length > 20) {
            req.flash('error', 'Длина пароля должна быть от 4 до 20 символов');
            res.redirect('/signUp');

        }

        if (pass !== confirm_pass) {
            req.flash('error', 'Пароли не совпадают');
            res.redirect('/signUp');
        }

        const candidate = await Owner.findOne({email});

        if (candidate) {
            req.flash('error', 'Пользователь с таким email уже существует');
            res.redirect('/signUp')
        } else {
            const hashPass = await bcrypt.hash(pass, 10);
            const owner = new Owner({
                first_name, second_name, email, password: hashPass, age, login: 4
            });

            await owner.save();
            res.redirect('/login')
        }
    } catch (e) {
        console.log(e)
    }
});


module.exports = router;