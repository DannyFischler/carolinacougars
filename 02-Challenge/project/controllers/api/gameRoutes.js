const axios = require('axios');
const router = require('express').Router();
const { Game, Comment } = require('../../models');

// Route to get game details and comments by game name
router.get('/search/:gameName', async (req, res) => {
  const gameName = req.params.gameName.replace(/-/g, ' ');

  try {
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.RAWG_API_KEY, // Ensure you have the RAWG API key set in your environment variables
        search: gameName,
      },
    });

    if (!rawgResponse.data.results.length) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const gameDetails = rawgResponse.data.results[0];

    const comments = await Comment.findAll({
      where: { game_id: gameDetails.id }, 
      include: [Game],
    });

    res.json({ gameDetails, comments });
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;
