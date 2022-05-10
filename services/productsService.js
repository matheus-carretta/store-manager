const productsModel = require('../models/productsModel');
const erroHandler = require('../utils/errorCreator');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getProduct = async (id) => {
  const product = await productsModel.getProduct(id);

  if (!product) throw erroHandler(404, 'Product not found');

  return product;
};

const create = async (name, quantity) => {
  const dbNameExists = await productsModel.findByName(name);

  if (dbNameExists) throw erroHandler(409, 'Product already exists');

  const productId = await productsModel.create(name, quantity);

  const newProduct = {
    id: productId,
    name,
    quantity,
  };

  return newProduct;
};

const update = async (product) => {
  const idExist = await productsModel.getProduct(product.id);

  if (!idExist) throw erroHandler(404, 'Product not found');

  await productsModel.update(product);

  return product;
};

const remove = async (id) => {
  const idExist = await productsModel.getProduct(id);

  if (!idExist) throw erroHandler(404, 'Product not found');

  const deleted = await productsModel.remove(id);

  return deleted;
};

module.exports = {
  getAll,
  getProduct,
  create,
  update,
  remove,
};
