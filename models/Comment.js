const Sequelize = require('sequelize');

function defineComment(db) {
    const Comment = db.define('comments', {
        question_id: {
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.TEXT
        }
    });

    Comment.associate = ({User, Question}) => {
        Comment.belongsTo(User);
        Comment.belongsTo(Question);
    };

    return Comment
}

module.exports = defineComment;