const {findByName} = require('../models/Product')
const errors = {
  nameRequired: 'Name field is required',
  nameLength: '"name" length must be at least 5 characters long',
  nameType: '"name" must be a string type',
  nameUniq: 'Product already exists',
  quantRequired: 'quantity field is required',
  quantLength: '"quantity" must be larger than or equal to 1',
  quantType: '"quantity" must be a number',
};

const code = 422;

const isNameUniq = async (name) => {
  const isUniq = await findByName(name)
  return isUniq
}

const isEmpty = (value) => (!value);
const isNotString = (value) => (typeof value !== 'string')
const isNotNumber = (value) => (typeof value !== 'number')
const isLessThanFive = (value) => (value.length < 5)
const isNegativeNumber = (value) => (value < 1)

const isValid = (name, quantity) => {
  switch (true) {
    case isEmpty(name): return { code, message: errors.nameRequired };
    case isNotString(name): return { code, message: errors.nameType };
    case isLessThanFive(name): return { code, message: errors.nameLength };
    
    case isEmpty(quantity): return { code, message: errors.quantRequired };
    case isNotNumber(quantity): return { code, message: errors.quantType };
    case isNegativeNumber(quantity): return { code, message: errors.quantLength };

    default: return {};
  }
};

module.exports = { 
  isValid,
  isNameUniq,
};