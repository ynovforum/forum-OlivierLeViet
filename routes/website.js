const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const {User, Comment, Question} = require('../models');
//##########ROUTING############


router.get('/', (req, res) => {
    const user = req.user;
    Question.sync().then(function () {
        if(user) {
            if (user.role === 'Admin') {
                res.redirect('admin');
            } else {
                Question.findAll().then((questions) => {res.render('home', {user: req.user, questions});})
            }
        } else {
            Question.findAll().then((questions) => {res.render('home', {user: req.user, questions});})
        }
    })
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/api/signin', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

//##########CREATION USER
router.post('/api/login', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const bio = req.body.bio;
    User.sync().then(() => {
        return User.count().then(function (ad) {
            if (ad === 0) {
                User.create({name: username, password: password, email: email, bio: bio, role: "Admin"})
                    .then((user) => {
                        req.login(user, () => {
                            res.redirect('/');
                        })
                    })
            } else {
                User.create({name: username, password: password, email: email, bio: bio, role: "User"})
                    .then((user) => {
                        req.login(user, () => {
                            res.redirect('/');
                        })
                    })
            }
        })
    })
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;