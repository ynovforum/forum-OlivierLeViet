const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, Comment, Question} = require('../models');

router.post('/api/qpost', (req, res) => {
    const title = req.body.title;
    const content = req.body.description;
    const id = req.user.id;
    console.log('dfg');
    Question.create({title: title, description: content, userId: id})
        .then(() => {
            res.redirect('/');
        })
});

module.exports = router;