//importing dependencies

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // make sure this path is correct
const sequelize = require('./config/connection'); // make sure this path is correct
const helpers = require('./utils/helpers');
// Importing routes
const gameRoutes = require('./controllers/api/gameRoutes'); 
const commentRoutes = require('./controllers/api/commentRoutes');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

    //creating a session object
    const sess = {
      secret: process.env.SECRET,
      cookie: {},
      resave: false,
      saveUninitialized: true,
      store: new SequelizeStore({
          db: sequelize
      }),
      //setting session to expire after 15 min
      expires: new Date(Date.now() + (15*60000))

  };

      //template engine to use
      app.engine('handlebars', hbs.engine);
      app.set('view engine', 'handlebars');

 

    //middleware
    app.use(session(sess));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(routes);


    sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => console.log(`now listning on port ${PORT}`));
  });
