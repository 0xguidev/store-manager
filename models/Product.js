const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const myDB = await connection();
  const {insertedId} = await myDB.collection('products').insertOne({name, quantity});
  
  return {
    _id: insertedId,
    name,
    quantity
  }
};

const getAll = async () => {
  const myDb = await connection();
  const allProdutcs = await myDb.collection('products').find({}).toArray();
  
  return allProdutcs;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const myDb = await connection();
  const product = await myDb.collection('products').findOne(new ObjectId(id));

  if (!product) return null;
  return product;
};

const findByName = async (name) => {
  const myDb = await connection()
  const isUniq = myDb.collection('products').findOne({name: name})
  return isUniq;
}

const updatedProduct = async (id, name, quantity) => {
  const filter = { _id: ObjectId(id) };
  const updates = {
    $set: {
      name,
      quantity,
    },
  };
  
  const myDb = await connection();
  const updated = await myDb.collection('products').updateOne(filter, updates);
  
  return updated;
};

const deleteProduct = async (id) => {
  const filter = { _id: ObjectId(id) };
  const myDb = await connection();
  const deleted = await myDb.collection('products').deleteOne(filter);
  
  return deleted;
};

module.exports = {
  create,
  getAll,
  findById,
  findByName,
  updatedProduct,
  deleteProduct,
};