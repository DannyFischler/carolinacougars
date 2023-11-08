//importing dependencies

const Comment = require('../models/comment');

//data to input

//data array to seed
const commentData = [
    {
        comment: 'Even after they came out with PS5 the black ops 2 servers were still up and running for PS3!',
        user_id: 1,
        game_id: 1
    },
    {
        comment: 'I grew up play original Zelda on NES and i sadly have not played this game yet!',
        user_id: 2,
        game_id: 2
    },
    {
        comment: 'Tekken is one of my all time favorite game franchise. After Tekken 3 it just exploded with advancements!',
        user_id: 3,
        game_id: 3
    }
];

//bulk creating data using array
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment