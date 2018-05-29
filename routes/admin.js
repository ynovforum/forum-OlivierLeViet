const router = require('express').Router();
const Sequelize = require('sequelize');
const {User, Comment, Question} = require('../models');

//#############CREATION QUESTION#######
router.post('/api/qpost', (req, res) => {
    const title = req.body.title;
    const content = req.body.description;
    const id = req.user.id;
    const poster = req.user.name;
    Question.sync().then(() => {
        Question.create({title: title, description: content, userId: id, poster: poster})
            .then(() => {
                console.log('Création d un article');
                res.redirect('/admin');
            })
    })
});

//#########QUESTION EDIT#########
router.post('/api/edit', (req, res) => {
    const user = req.user;
    const title = req.body.title;
    const desc = req.body.description;
    const userId = req.body.userId;
    const poster = req.body.poster;
    res.render('admin/questionEdit', {user, title, desc, userId, poster});
});


router.get('/', (req, res) => {
    const id = req.user.id;
    const user = req.user;
    Question.sync().then(() => {
        Question.findAll({where: {userId: id}}).then((questionID) => {
            Question.findAll({
                where: {userId: {[Sequelize.Op.not]: id}}
            }).then((questionNoID) => {
                res.render('admin', {user, questionID, questionNoID});
            });
        })
    })
});

module.exports = router;