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
  const myDb = await connection();
  const product = await myDb.collection('sales').findOne(new ObjectId(id));

  if (!product) return null;
  return product;
};

const update = async (id, products) => {
  const filter = { _id: ObjectId(id) };
  const updates = {
    $set: {
      itensSold: products,
    },
  };
  
  const myDb = await connection();
  const updated = await myDb.collection('sales').updateOne(filter, updates);
  
  return updated;
};

const deleted = async (id) => {
  const filter = { _id: ObjectId(id) };
  const myDb = await connection();
  const deletedSale = await myDb.collection('sales').deleteOne(filter);
  
  return deletedSale.result.ok;
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleted,
};