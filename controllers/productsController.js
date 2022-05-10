const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getProduct(id);

  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.create(name, quantity);

  return res.status(201).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = {
    id,
    name,
    quantity,
  };

  const updatedProduct = await productsService.update(product);

  return res.status(200).json(updatedProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;

  await productsService.remove(id);

  return res.status(204).json();
};

module.exports = {
  getAll,
  getProduct,
  create,
  update,
  remove,
};
