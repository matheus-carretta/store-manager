const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT * FROM sales_products AS sp
  INNER JOIN sales AS sa 
  ON sa.id = sp.sale_id;
  `);

  return sales;
};

const getSale = async (id) => {
  const [sales] = await connection.execute(`
  SELECT * FROM sales_products AS sp
  INNER JOIN sales AS sa 
  ON sa.id = sp.sale_id
  WHERE id=?;
  `, [id]);

  return sales;
};

const create = async () => {
  const [newSale] = await connection.execute(`
    INSERT INTO sales (date) 
    VALUES (?);
  `, [new Date()]);

  return newSale.insertId;
};

const createSalePerProduct = async (saleId, { productId, quantity }) => {
  const [salePerProductId] = await connection.execute(`
    INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
  `, [saleId, productId, quantity]);

  return salePerProductId;
};

const update = async (saleId, { productId, quantity }) => {
  const [updatedSale] = await connection.execute(`
    UPDATE sales_products
    SET product_id=?, quantity=?
    WHERE sale_id=?
  `, [productId, quantity, saleId]);

  return updatedSale;
};

const remove = async (saleId) => {
  const deletedSale = await connection.execute(`
    DELETE FROM sales
    WHERE id=?
  `, [saleId]);

  return deletedSale;
};

const removeSalePerProduct = async (saleId) => {
  const deletedSale = await connection.execute(`
    DELETE FROM sales_products
    WHERE sale_id=?
  `, [saleId]);

  return deletedSale;
};

module.exports = {
  getAll,
  getSale,
  create,
  createSalePerProduct,
  update,
  remove,
  removeSalePerProduct,
};
