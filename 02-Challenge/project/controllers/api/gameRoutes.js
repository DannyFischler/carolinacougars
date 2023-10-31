const axios = require('axios');
const router = require('express').Router();
const { Comment } = require('../../models'); // Adjust the path as necessary

router.get('/search/:gameName', async (req, res) => {
  const gameName = req.params.gameName.replace(/-/g, ' '); // Replace hyphens with spaces for the API search
  const rawgApiKey = process.env.RAWG_KEY; // Ensure your RAWG API key is set in your environment

  try {
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: rawgApiKey,
        search: gameName,
      },
    });

    if (!rawgResponse.data.results.length) {
      return res.status(404).json({ message: 'Game not found in RAWG API' });
    }

    const gameDetails = rawgResponse.data.results[0]; // Assuming the first result is the desired game

    const comments = await Comment.findAll({
      where: { rawg_game_id: gameDetails.id },
    });

    const responseData = {
      gameDetails: {
        name: gameDetails.name,
        released: gameDetails.released,
        platforms: gameDetails.platforms.map(p => p.platform.name),
        developers: gameDetails.developers?.map(dev => dev.name) ?? 'No developers listed',
      },
      comments: comments.length ? comments : 'No comments',
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ message: 'Error fetching data from RAWG API', error });
  }
});

module.exports = router;
