const Sequelize = require('sequelize');

function defineComment(db) {
    const Comment = db.define('comments', {
        content: {
            type: Sequelize.TEXT
        },
        userName: {
            type: Sequelize.STRING
        }
    });

    Comment.associate = ({User, Question}) => {
        Comment.belongsTo(User);
        Comment.belongsTo(Question);
    };

    return Comment
}

module.exports = defineComment;