require('dotenv').config();

const express = require('express');
const sequelize = require('./config/connection'); 

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3001;

// Importing routes
const gameRoutes = require('./controllers/api/gameRoutes'); 
const commentRoutes = require('./controllers/api/commentRoutes'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using routes
app.use('/api/games', gameRoutes);
app.use('/api/comments', commentRoutes);



sequelize.sync({ force: false }).then(() => {
  console.log('Database synced with models!');
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
