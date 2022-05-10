const salesModel = require('../models/salesModel');
const { serializeSale, serializeSales } = require('../utils/serialize');
const erroHandler = require('../utils/errorCreator');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales.map(serializeSales);
};

const getSale = async (id) => {
  const sale = await salesModel.getSale(id);

  if (!sale || !sale.length) throw erroHandler(404, 'Sale not found');

  return sale.map(serializeSale);
};

const create = async (arraySales) => {
  const newSaleId = await salesModel.create();

  arraySales.map((sale) => salesModel.createSalePerProduct(newSaleId, sale));

  const newSale = {
    id: newSaleId,
    itemsSold: arraySales,
  };

  return newSale;
};

module.exports = {
  getAll,
  getSale,
  create,
};