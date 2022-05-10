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

const createSalePerProduct = async (saleId, sale) => {
  const [salePerProductId] = await connection.execute(`
    INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
  `, [saleId, sale.productId, sale.quantity]);

  return salePerProductId;
};

module.exports = {
  getAll,
  getSale,
  create,
  createSalePerProduct,
};
