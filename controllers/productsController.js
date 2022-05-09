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

  const newId = await productsService.create(name, quantity);

  const newProduct = {
    id: newId,
    name,
    quantity,
  };

  return res.status(201).json(newProduct);
}

module.exports = {
  getAll,
  getProduct,
  create,
};
