const {Game} = require('../models')

//defining data to input

 //data array to seed
 const gameData = [
    {
        title: 'Which is the best Call of Duty game?',
        content: 'Black ops 2?',
        user_id: 1

    },
    {
        title: 'What is the best RPG?',
        content: 'Breath of the wild?',
        user_id: 2
    },
    {
        title: 'What is the best fighter franchise?',
        content: 'Tekken?',
        user_id: 3
    }
];

//bulk creating the data
const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;