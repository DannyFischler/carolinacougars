const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Text content of the comment
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Game slug from RAWG API to link comments to specific game
    game_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

{
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment',
});

module.exports = Comment;
