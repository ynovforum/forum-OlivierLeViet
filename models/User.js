const Sequelize = require('sequelize');

function defineUser(db) {
    const User = db.define('users', {
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.TEXT
        },
        role: {
            type: Sequelize.ENUM('User', 'Admin')
        }
    });

    User.associate = ({Question, Comment}) => {
        User.hasMany(Question);
        User.hasMany(Comment);
    };

    return User;
}

module.exports = defineUser;