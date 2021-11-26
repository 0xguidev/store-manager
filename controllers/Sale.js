const Sale = require('../services/Sale');

const create = async (req, res) => {
  const request = req.body;

  const itensSold = await Sale.create(request);

  if (itensSold.err) return res.status(422).json(itensSold);

  res.status(200).json(itensSold);
};

module.exports = {
  create,
};