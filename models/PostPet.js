const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PostPet extends Model {}

PostPet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        image: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        // user_name: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'user',
        //         key: 'name',
        //     },
        // },

    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'postpet',
    }
);

module.exports = PostPet;