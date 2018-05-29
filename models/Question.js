const Sequelize = require('sequelize');

function defineQuestion(db) {
    const Question = db.define('questions', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        resolved_at: {
            type: Sequelize.DATE
        },
        poster: {
            type: Sequelize.STRING
        }

    });

    Question.associate = ({User, Comment}) => {
        Question.hasMany(Comment);
        Question.belongsTo(User);
    };

    return Question;
}

module.exports = defineQuestion;