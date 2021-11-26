const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const myDB = await connection();
  const { insertedId } = await myDB.collection('sales').insertOne({ itensSold });
  
  return {
    _id: insertedId,
    itensSold,
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const myDb = await connection();
  const product = await myDb.collection('products').findOne(new ObjectId(id));

  if (!product) return null;
  return product;
};

module.exports = {
  create,
  findById,
};