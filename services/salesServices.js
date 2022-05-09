const salesModel = require('../models/salesModel');
const { serializeSale, serializeSales } = require('../utils/serialize');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales.map(serializeSales);
};

const getSale = async (id) => {
  const sale = await salesModel.getSale(id);

  return sale.map(serializeSale);
};

module.exports = {
  getAll,
  getSale,
};