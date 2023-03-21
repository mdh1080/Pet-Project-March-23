
const Comment = require('./Comment');
const PostPet = require('./PostPet');
const User = require('./User');

// PostPet.hasMany(Comment, {
//     foreignKey: 'postpet_id',
//     onDelete: 'CASCADE',
// });

// Comment.belongsTo(PostPet, {
//     foreignKey: 'postpet_id',
// });

User.hasMany(PostPet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

PostPet.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, PostPet, Comment };

