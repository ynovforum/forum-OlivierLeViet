const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');

const db = new Sequelize('forumoli', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const models = requireModels(db, __dirname);

module.exports = Object.assign({ db }, models);