const express = require('express');
const axios = require('axios');
const { CommentModel } = require('./models');  // Assuming you have a Sequelize model for comments

const app = express();
const PORT = 3001;

app.use(express.static('public'));  // Serve static files like HTML, JS, CSS from a "public" directory

app.get('/search', async (req, res) => {
    const gameName = req.query.game;

    // Call RAWG API (please handle errors appropriately)
    const rawgResponse = await axios.get(`https://api.rawg.io/api/games?search=${gameName}&key=YOUR_API_KEY`);
    const gameData = rawgResponse.data.results[0];  // Taking the first result for simplicity

    // Fetch comments from the database
    const comments = await CommentModel.findAll({ where: { gameId: gameData.id } });

    res.json({
        title: gameData.name,
        image: gameData.background_image,
        description: gameData.description_raw,
        comments: comments.map(c => c.text)  // Assuming each comment has a "text" field
    });
});

// ... your POST route to handle comment submissions ...

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
