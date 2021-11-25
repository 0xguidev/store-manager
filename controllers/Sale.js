const Sale = require('../models/Sale');

const create = async (req, res) => {
  const request = req.body;

  const itensSold = await Sale.create(request);

  // if (message) return res.status(code).json({err: {code: 'invalid_data', message: message}})
  
  res.status(201).json(itensSold);
};

module.exports = {
  create,
};