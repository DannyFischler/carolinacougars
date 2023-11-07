//importing dependencies

const router = require('express').Router();
const { User, Game } = require('../../models');
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
            
    try{

        //getting data
        const gameData = await Game.findAll({
            include: [
                {
                    model: User, 
                },
                {
                    model: Comment,
                },
            ],
            where: {
                user_id: req.session.user_id
            }
        });

            

        //serialzing data for template to read
        const games = gameData.map((game) => game.get({plain : true}));
        

        //passing serialized data and session flag into db
        res.render('dash', {
            games,
            logged_in: req.session.logged_in,
            user_name: req.session.user_name,
            user_id: req.session.user_id,

        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//post routes

router.post('/game', withAuth, async (req, res) => {
    console.log(`trying to create a comment`)
    try {
        console.log(JSON.stringify(req.body));
        const gameData = await Game.create(req.body);
        res.status(200).json(gameData);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});



    // Posts new game
        router.post('/game', withAuth, async (req, res) => {
            console.log(`trying to create a comment`)
            try {
                console.log(JSON.stringify(req.body));
                const gameData = await game.create(req.body);
                res.status(200).json(gameData);
            } 
            catch (err) {
                res.status(400).json(err);
            }
        });

    //posting new comments
        router.post('/comment', withAuth, async (req, res) => {
            console.log(`reqeust body is ${JSON.stringify(req.body)}`)
            try {
                const commentData = await Comment.create(req.body);
                res.status(200).json(commentData);
            } 
            catch (err) {
                    res.status(400).json(err);
            }
        });



//editing existing comment

        router.put('/game/:id', async (req, res) => {
            console.log(`reqeust body is ${JSON.stringify(req.body)}`)
            console.log(req.params.id)
            try {
                await Game.update(
                    {
                        title: req.body.title,
                        content:req.body.content
                    },
                    {where: {id:req.params.id}}
                )
                res.status(200).json(`comment updated successfully!`);
            } 
            catch (err) {
                    res.status(400).json(err);
            }
        });

        //route to delete a blog
router.delete('/game/:id', async (req, res) => {
    console.log(`reqeust body is ${JSON.stringify(req.body)}`)
    try {
        await game.destroy(
            {where: {id: req.params.id}}
        )
        res.status(200).json(`game deleted successfully.`);
    } 
    catch (err) {
            res.status(400).json(err);
    }
});

module.exports = router;