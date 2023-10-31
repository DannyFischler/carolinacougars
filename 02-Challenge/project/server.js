const express = require('express');
const routes = require('./controllers'); // make sure this path is correct
const sequelize = require('./config/connection'); // make sure this path is correct

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync the database and force it to recreate tables based on the current model definitions
sequelize.sync({ force: true }).then(() => { // Only use { force: true } if you're sure you want to drop tables
  console.log('Database & tables created!');
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
