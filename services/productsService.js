const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getProduct = async (id) => {
  const productDontExist = { status: 404, message: 'Product not found' };

  const product = await productsModel.getProduct(id);

  if (!product) throw productDontExist;

  return product;
};

const create = async (name, quantity) => {
  const productId = await productsModel.create(name, quantity);

  return productId;
};

module.exports = {
  getAll,
  getProduct,
  create,
};
