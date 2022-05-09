const salesService = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getSale = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getSale(id);

  return res.status(200).json(sale);
};

const create = (req, res) => res.status(200).json({ message: 'Teste' });

module.exports = {
  getAll,
  getSale,
  create,
};
