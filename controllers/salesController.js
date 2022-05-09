const salesService = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getSale = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getSale(id);

  console.log(sale);

  return res.status(200).json(sale);
};

module.exports = {
  getAll,
  getSale,
};
