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

const verifyStock = async (arraySales) => {
  const enoughStock = await Promise.all(arraySales.map(async ({ productId, quantity }) => {
    const { quantity: actualQuantity } = await productsModel.getProduct(productId);
    if (actualQuantity < quantity) {
      throw erroHandler(422, 'Such amount is not permitted to sell');
    }
    return true;
  }));
  return enoughStock;
};

const create = async (arraySales) => {
  await verifyStock(arraySales);
  
  const newSaleId = await salesModel.create();

  await Promise.all((arraySales.map(async (sale) => {
    productsModel.decreaseStock(sale.productId, sale.quantity);
    salesModel.createSalePerProduct(newSaleId, sale);
  })));

  const newSale = {
    id: newSaleId,
    itemsSold: arraySales,
  };

  return newSale;
};

const update = async (id, arraySales) => {
  await Promise.all(arraySales.map((sale) => salesModel.update(id, sale)));

  const updatedSale = {
    saleId: id,
    itemUpdated: arraySales,
  };

  return updatedSale;
};

const remove = async (id) => {
  const sales = await salesModel.getSale(id);

  if (!sales || !sales.length) throw erroHandler(404, 'Sale not found');

  await Promise.all(sales.map(({ product_id, quantity }) =>
   productsModel.increaseStock(product_id, quantity)));

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