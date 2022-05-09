const salesModel = require('../models/salesModel');
const { serializeSale, serializeSales } = require('../utils/serialize');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales.map(serializeSales);
};

const getSale = async (id) => {
  const saleDontExist = { status: 404, message: 'Sale not found' };

  const sale = await salesModel.getSale(id);

  if (!sale || !sale.length) throw saleDontExist;

  return sale.map(serializeSale);
};

module.exports = {
  getAll,
  getSale,
};