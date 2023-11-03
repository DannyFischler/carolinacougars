const axios = require('axios');
const router = require('express').Router();
const { Comment } = require('../../models');

// Route to post a new comment associated with a game's slug from the RAWG API
router.post('/', async (req, res) => {
  const { gameName, text } = req.body;

  try {
    // Fetch game details from RAWG API
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.RAWG_KEY,
        search: gameName,
      },
    });

    if (!rawgResponse.data.results.length) {
      return res.status(404).json({ message: 'Game not found in RAWG API' });
    }

    const gameSlug = rawgResponse.data.results[0].slug;

    // Create a new comment and associate it with the game's slug
    const newComment = await Comment.create({
      game_slug: gameSlug, // The Comment model needs to have a 'game_slug' field
      text,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Error posting comment', error });
  }
});

module.exports = router;
