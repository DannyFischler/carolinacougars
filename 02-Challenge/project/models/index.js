const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Game = require('./Game');
const Comment = require('./Comment');

Comment.belongsTo(Game, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

Game.hasMany(Comment, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = { Game, Comment };
