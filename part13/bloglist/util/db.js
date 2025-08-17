const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config.js');

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connected');
  } catch (error) {
    console.log('connecting to database failed');
    return process.exit(1);
  }

  return null
};

module.exports = { sequelize, connectToDatabase };
