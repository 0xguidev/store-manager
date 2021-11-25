require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/StoreManager`;
const DB_NAME = 'StoreManager';

let connection = null;

module.exports = async () => {
  try {
    connection = (connection || (await MongoClient.connect(MONGO_DB_URL, OPTIONS)).db(DB_NAME));
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
