const User = require('./user');
const Game = require('./Game');
const Comment = require('./comment');

//users & games

    //a game belongs to one user
    Game.belongsTo(User, {
        foreignKey:'user_id'
    });

    //a user has many games
    User.hasMany(Game, {
        foreignKey: 'user_id'
    });

//comments and users

    //a comment belongs to one user. This foreign key adds a user_id to comment
    Comment.belongsTo(User, {
        foreignKey:'user_id'
    });

    //a user has many comments, creating foreign key in the Comments Table (as user_id) so the user can have many comments and not one
    User.hasMany(Comment, {
        foreignKey: 'user_id',
    });

//comments & games

    //a comment belongs to one game
    Comment.belongsTo(Game, {
        foreignKey:'game_id'
    });

    //a game has many comments
    Game.hasMany(Comment, {
        foreignKey:'game_id',
        onDelete: 'CASCADE'
    })

    module.exports = {
        User,
        Game,
    };