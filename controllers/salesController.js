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

const create = async (req, res) => {
  const salesList = req.body;

  const newSale = await salesService.create(salesList);

  return res.status(201).json(newSale);
};

const update = async (req, res) => {
  const salesList = req.body;
  const { id } = req.params;

  const updatedSale = await salesService.update(id, salesList);

  return res.status(200).json(updatedSale);
};

const remove = async (req, res) => {
  const { id } = req.params;

  await salesService.remove(id);

  return res.status(204).json();
};

module.exports = {
  getAll,
  getSale,
  create,
  update,
  remove,
};
