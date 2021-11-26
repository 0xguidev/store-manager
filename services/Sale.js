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

module.exports = {
  create,
};