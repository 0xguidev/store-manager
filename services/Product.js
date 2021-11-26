const { ObjectId } = require('mongodb');
const productModel = require('../models/Product');
const { isValid } = require('../schemas/Product');

const create = async (name, quantity) => {
  const { message, code } = await isValid(name, quantity);
  if (message) return { message, code };

  const product = await productModel.create(name, quantity);

  return { code: 201, product };
};

const getAll = async () => productModel.getAll();

const findById = async (id) => {
  const product = await productModel.findById(id);

  if (!product) {
    return {
      err: { code: 'invalid_data', message: 'Wrong id format' },
    };
  }

  return product;
};

const updatedProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return {
      err: { code: 'invalid_data', message: 'Wrong id format' },
    };
  }

  const idValidate = await productModel.findById(id);
  if (!idValidate) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const { message } = await isValid(name, quantity);

  if (message) return { err: { code: 'invalid_data', message } };

  const updated = await productModel.updatedProduct(id, name, quantity);

  if (updated.result.ok === 1) return { id, name, quantity };
};

const deleted = async (id) => {
  const productDeleted = await productModel.deleteProduct(id);
  if (!productDeleted) {
    return null;
  }

  return 'deleted';
};

module.exports = {
  create,
  getAll,
  findById,
  updatedProduct,
  deleted,
};

// '"name" length must be at least 5 characters long'
// 'Product already exists'
// '"quantity" must be larger than or equal to 1'
// '"quantity" must be a number'