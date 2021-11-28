const { getAll } = require('../models/Product');

const verifyQuant = (sale) => {
  const sales = sale.filter(({ quantity }) => ((quantity < 1
    || typeof quantity === 'string')
    ? { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }
    : null));
  return sales;
};

const verifyId = async (sale) => {
  const prod = await getAll();
  const isproductIdValid = sale.map(({ productId }) => prod
    .find(({ _id }) => _id.toString() === productId));
    console.log(isproductIdValid.some((item) => item === undefined));
  return isproductIdValid.some((item) => item === undefined);
};

module.exports = {
  verifyQuant,
  verifyId,
};