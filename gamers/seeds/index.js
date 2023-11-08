const seedUser = require('./user-seeds');
const seedGame = require('./game-seeds');
const seedComment = require('./comment-seeds');

const sequelize = require('../config/connection');

//defining function to seed db

const seedAll = async () => {
    //running seedall will overwrite existing table data
    await sequelize.sync({ force: true }); //adds drop table to overwrite existing data
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

    await seedGame();
    console.log('\n----- GAMES SEEDED -----\n');

    await seedComment();
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();