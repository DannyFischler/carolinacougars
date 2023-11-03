const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Heroku deployment with JAWSDB add-on
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Local development or other deployment without JAWSDB_URL
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
    },
  );
}

module.exports = sequelize;
