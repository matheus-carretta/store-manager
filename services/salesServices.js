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

module.exports = {
  getAll,
  getSale,
};