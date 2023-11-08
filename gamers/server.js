//importing dependencies

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

//sequelize setup

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//express server

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({helpers});

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