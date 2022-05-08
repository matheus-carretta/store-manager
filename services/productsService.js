const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getProduct = async (id) => {
  const product = await productsModel.getProduct(id);

  return product;
};

module.exports = {
  getAll,
  getProduct,
};
