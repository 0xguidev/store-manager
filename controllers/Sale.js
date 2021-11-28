const Sale = require('../services/Sale');

const create = async (req, res) => {
  const request = req.body;

  const itensSold = await Sale.create(request);

  if (itensSold.err) return res.status(422).json(itensSold);

  res.status(200).json(itensSold);
};

const getAll = async (_req, res) => {
  const sales = await Sale.getAll();

  return res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await Sale.getById(id);

  if (sales.err) return res.status(404).json(sales);
  return res.status(200).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const products = req.body;

  const isUpdated = await Sale.update(id, products);
  if (isUpdated.err) return res.status(422).json(isUpdated);

  return res.status(200).json(isUpdated);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};