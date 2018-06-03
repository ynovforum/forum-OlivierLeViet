const router = require('express').Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const {User, Comment, Question} = require('../models');

router.post('/api/comment', (req, res) => {
    const user = req.user;
    const userId = user.id;
    const qId = req.body.id;
    const userN = user.name;
    const content = req.body.content;
    Comment
        .create({content: content, questionId: qId, userId: userId, userName: userN})
        .then(() => {
            Question
                .findAll({where: {userId: userId}})
                .then((questionID) => {
                    Question.findAll({
                        where: {userId: {[Sequelize.Op.not]: userId}}
                    }).then((questionNoID) => {
                        res.render('user', {user, questionID, questionNoID});
                    });
                })
        })
});




router.post('/api/qpost', (req, res) => {
    const title = req.body.title;
    const content = req.body.description;
    const id = req.user.id;
    const poster = req.user.name;
    console.log('dfg');
    Question.create({title: title, description: content, userId: id, poster: poster})
        .then(() => {
            res.redirect('/');
        })
});

module.exports = router;