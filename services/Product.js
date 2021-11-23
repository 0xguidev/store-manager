const productModel = require('../models/Product');
const { isValid, isNameUniq } = require('../schemas/Product');

const create = async (name, quantity) => {
  const isUniq = await isNameUniq(name);
  if(isUniq) return {code: 422, message: 'Product already exists'};
  
  
  const {message, code} = isValid(name, quantity);
  if (message) return { message, code };

  const product = await productModel.create(name, quantity);
  
  return {code: 201, product};
};

const getAll = async () => productModel.getAll();

const findById = async (id) => {
    const product = await productModel.findById(id);

    if (!product) {
      return {
        error: {
          code: 'notFound',
          message: 'Produto nao encontrado',
        },
      };
    }
    
    return product;
};

const updatedProduct = async (id, name, quantity) => {
const updated = await productModel.updatedProduct(id, name, quantity);
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