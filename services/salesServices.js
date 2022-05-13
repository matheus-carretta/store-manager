const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
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

  await arraySales.map((sale) => {
    productsModel.decreaseStock(sale.productId, sale.quantity);
    return salesModel.createSalePerProduct(newSaleId, sale);
  });

  const newSale = {
    id: newSaleId,
    itemsSold: arraySales,
  };

  return newSale;
};

const update = async (id, arraySales) => {
  await arraySales.map((sale) => salesModel.update(id, sale));

  const updatedSale = {
    saleId: id,
    itemUpdated: arraySales,
  };

  return updatedSale;
};

const remove = async (id) => {
  const sales = await salesModel.getSale(id);

  if (!sales || !sales.length) throw erroHandler(404, 'Sale not found');

  await sales.map(({ product_id, quantity }) => productsModel.increaseStock(product_id, quantity));

  await salesModel.removeSalePerProduct(id);

  const deleted = await salesModel.remove(id);

  return deleted;
};

module.exports = {
  getAll,
  getSale,
  create,
  update,
  remove,
};