const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_comment: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        postpet_id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'post',
            key: 'id',
            },
        },
    },
},
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'Comment',
        },
);

module.exports = Comment;