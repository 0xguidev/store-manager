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

const getAll = async () => {
  const myDb = await connection();
  const allSales = await myDb.collection('sales').find({}).toArray();
  
  return allSales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const myDb = await connection();
  const product = await myDb.collection('sales').findOne(new ObjectId(id));

  if (!product) return null;
  return product;
};

module.exports = {
  create,
  getById,
  getAll,
};