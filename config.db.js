const { Sequelize } = require('sequelize');
require('dotenv').config();


const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('./config.js')

let connection;

if (process.env.DATABASE_URL) {
    connection = new Sequelize(process.env.DATABASE_URL)
}
else {
    connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
    })
}


// Test the database connection
connection
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = {connection};
