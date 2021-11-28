const models = require('../models/Sale');

const create = async (sale) => {
  const sales = sale.filter(({ quantity }) => ((quantity < 1
    || typeof quantity === 'string')
    ? { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }
    : null));
  if (sales.length !== 0) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }

  const itensSold = await models.create(sale);
  return itensSold;
};

const getAll = async () => models.getAll();

const getById = async (id) => {
  const sales = await models.getById(id);

  if (!sales) {
    return {
      err: { code: 'not_found', message: 'Sale not found' },
    };
  }
};

module.exports = {
  create,
  getAll,
  getById,
};