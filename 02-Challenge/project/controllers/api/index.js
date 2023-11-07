const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const Game = require('./Game');
const Comment = require('./Comment');
const User = require('./User');  // Import the User model

// Existing Game and Comment associations
Comment.belongsTo(Game, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

Game.hasMany(Comment, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

// Define User and Comment associations
User.hasMany(Comment, {
  foreignKey: 'userId',  
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',  
  onDelete: 'CASCADE',
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = { Game, Comment, User };  // Export the User model
