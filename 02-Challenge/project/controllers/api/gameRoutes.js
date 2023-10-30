const axios = require('axios');
const router = require('express').Router();
const { Game, Comment } = require('../../models');

// Get game details and associated comments from the local database
router.get('/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!gameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post a new comment for a game in the local database
router.post('/:id/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      game_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// New endpoint to search for a game by name using the RAWG API and return basic info along with comments
router.get('/search/:gameName', async (req, res) => {
  const gameName = req.params.gameName;
  const rawgApiKey = process.env.RAWG_KEY; // Your RAWG API key

  try {
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: rawgApiKey,
        search: gameName
      }
    });

    if (!rawgResponse.data.results || rawgResponse.data.results.length === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Assuming the desired game is the first result
    const gameDetails = rawgResponse.data.results[0];
    
    // Extracting the desired information
    const basicInfo = {
      name: gameDetails.name, // Game name
      released: gameDetails.released, // Release date
      developers: gameDetails.developers ? gameDetails.developers.map(dev => dev.name) : [], // Array of developer names
      platforms: gameDetails.platforms ? gameDetails.platforms.map(platform => platform.platform.name) : []  // Array of platform names
    };

    const comments = await Comment.findAll({
      where: { gameName: gameName } 
    });

    // Construct the response
    const responseData = {
      basicInfo: basicInfo,
      comments: comments
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;
