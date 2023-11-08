const router = require('express').Router();
const { User, Game} = require('../models');
const Comment = require('../models/comment');

//getting routes

 //visiting site for the first time having no prior login render dash_home with no create or edit options
 router.get('/', async (req, res) => {
        
    try{

        //getting data from the blogs db
        const gameData = await Game.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
               
            ],
        });
        
        //serializing data for template to read
        const games = gameData.map((blog) => game.get({plain : true}));

        //passing serialized data and session flag into the db
        res.render('home', {
            games,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//post routes

    //posting new comments associated to blogs and users to the db

            //Route
            router.post('/comment', async (req, res) => {
                console.log(`reqeust body is ${JSON.stringify(req.body)}`)
                try {
                    const commentData = await Comment.create(req.body);
                    res.status(200).json(commentData);
                } 
                catch (err) {
                    res.status(400).json(err);
                }
            });

            module.exports = router;