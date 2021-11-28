const { ObjectId } = require('mongodb');
const models = require('../models/Sale');
const { verifyQuant, verifyId } = require('../schemas/Sale');

const create = async (sale) => {
  const isQuantValid = verifyQuant(sale);

  if (isQuantValid.length !== 0) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  const itensSold = await models.create(sale);
  return itensSold;
};

const getAll = async () => models.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: { code: 'not_found', message: 'Sale not found' },
    };
  }
  const sales = await models.getById(id);

  if (!sales) {
    return {
      err: { code: 'not_found', message: 'Sale not found' },
    };
  }
};

const update = async (id, products) => {
  const isQuantValid = verifyQuant(products);
  const isProductIdValid = await verifyId(products);

  if (isProductIdValid) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  if (isQuantValid.length !== 0) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  const updated = await models.update(id, products);
  if (updated.result.ok !== 1) {
 return {
    err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
  }; 
}
  return { _id: id, itensSold: products };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};