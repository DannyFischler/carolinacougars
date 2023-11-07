const axios = require('axios');
const router = require('express').Router();
const { Game, Comment } = require('../../models');

// Route to get game details by game name
router.get('/search/:gameName', async (req, res) => {
  const gameName = req.params.gameName.replace(/-/g, ' ');

  try {
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.RAWG_API_KEY, 
        search: gameName,
      },
    });

    if (!rawgResponse.data.results.length) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const gameDetails = rawgResponse.data.results[0];

    // Extract attributes
    const attributes = {
      releaseDate: gameDetails.released,
      developers: gameDetails.developers.map(dev => dev.name),
      platforms: gameDetails.platforms.map(p => p.platform.name),
      genres: gameDetails.genres.map(genre => genre.name),
      // Include additional attributes you're interested in
    };

    // Fetch comments for the game
    const comments = await Comment.findAll({
      where: { game_id: gameDetails.id },
      include: [Game],
    });

    res.json({ gameDetails, attributes, comments });
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

router.get('/comments/:gameId/:attribute', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        game_id: req.params.gameId,
        category: req.params.attribute, 
      },
      include: [Game],
    });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});


module.exports = router;
