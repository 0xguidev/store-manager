// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sale) => {
  const myDB = await connection();
  const { insertedId } = await myDB.collection('sales').insertOne({ sale });
  
  return {
    _id: insertedId,

  };
};

module.exports = {
  create,
};