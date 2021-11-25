const { findByName } = require('../models/Product');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  nameUniq: 'Product already exists',
  quantLength: '"quantity" must be larger than or equal to 1',
  quantType: '"quantity" must be a number',
};

const code = 422;

const isNameUniq = async (name) => {
  const isUniq = await findByName(name);
  if (isUniq) return true;
  return false;
};

const isNotNumber = (value) => (typeof value !== 'number');
const isLessThanFive = (value) => (value.length < 5);
const isNegativeNumber = (value) => (value < 1);

const isValid = async (name, quantity) => {
  switch (true) {
    case isLessThanFive(name): return { code, message: errors.nameLength };
    case await isNameUniq(name): return { code, message: errors.nameUniq };
    case isNotNumber(quantity): return { code, message: errors.quantType };
    case isNegativeNumber(quantity): return { code, message: errors.quantLength };
    default: return {};
  }
};

module.exports = { 
  isValid,
};