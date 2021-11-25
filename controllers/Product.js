const Products = require('../services/Product');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { product, code, message } = await Products.create(name, quantity);

  if (message) return res.status(code).json({ err: { code: 'invalid_data', message } });
  
  res.status(code).json(product);
};

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findById(id);

  if (product.error) return ('deu ruim', product.code, product.message);

  res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const isUpdated = await Products.updatedProduct(id, name, quantity);

  res.status(204).json({ message: isUpdated });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const products = await Products.deleted(id);
  
  if (products !== 'deleted') res.status(404).json({ message: 'not found' });
  
  res.status(200).json({ message: 'produto deletado com sucesso' });
};

module.exports = { 
  create,
  getAll,
  findById,
  update,
  deleteProduct,
 };