const axios = require('axios');
const router = require('express').Router();
const { Game, Comment, User } = require('../../models'); // Include the User model

// Route to get game details by game name
router.get('/', async (req, res) => {  
  try{
      //rendering the login screen and status when they are logged in
      res.render('game');
  }
  catch (err) {
      res.status(500).json(err);
  }
})

router.get('/search/:gameName', async (req, res) => {
  const gameName = req.params.gameName.replace(/-/g, ' ');

  try {
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.RAWG_KEY,
        search: gameName,
      },
    });

    if (!rawgResponse.data.results.length) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    const gameInfo = rawgResponse.data.results[0];

    const gameidResponse = await axios.get(`https://api.rawg.io/api/games/${gameInfo.id}?key=${process.env.RAWG_KEY}`);

    if (!Object.keys(gameidResponse.data).length) {
      return res.status(404).json({ message: 'Game still not found' });
    }

    const gameDetails = gameidResponse.data;

    const attributes = {
      overview: gameDetails.description || "",
      releaseDate: gameDetails.released,
      developers: gameDetails.developers?.map(dev => dev.name) || [],
      platforms: gameDetails.platforms?.map(p => p.platform.name) || [],
      genres: gameDetails.genres?.map(genre => genre.name) || [],
      // Include additional attributes you're interested in
    };
    

    // Fetch comments for the game including user details
    const comments = await Comment.findAll({
      where: { game_id: gameDetails.id },
      include: [
        { model: Game },
        { model: User, attributes: ['user_name'] } // Assuming 'user_name' is the field you want from the User model
      ],
    });
    res.render('game', { gameDetails, attributes, comments });
    // res.json({ gameDetails, attributes, comments });
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Route to get comments for a specific game by ID and attribute/category
router.get('/comments/:gameId/:attribute', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        game_id: req.params.gameId,
        category: req.params.attribute,
      },
      include: [
        { model: Game },
        { model: User, attributes: ['user_name'] } // Include User details here as well
      ],
    });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

module.exports = router;
