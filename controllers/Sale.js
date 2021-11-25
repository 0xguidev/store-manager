// const Sales = require('../services/Sale');

const create = async (req, res) => {
  const request = req.body;

  // const {product, code, message} = await Products.create( name, quantity);

  // if (message) return res.status(code).json({err: {code: 'invalid_data', message: message}})
  
  res.status(200).json({ message: request });
};

module.exports = {
  create,
};