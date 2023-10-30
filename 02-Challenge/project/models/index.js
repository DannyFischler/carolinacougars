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

module.exports = { Game, Comment };
