const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//initializing the product model

class Comment extends Model {}

//model Layout
Comment.init(

    //defining attributes
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Game',
                key: 'id'
            }
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },

    //model options
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;