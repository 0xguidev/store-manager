// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const myDB = await connection();
  const { insertedId } = await myDB.collection('sales').insertOne({ itensSold });
  
  return {
    _id: insertedId,
    itensSold,
  };
};

module.exports = {
  create,
};