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

module.exports = {
  getAll,
  getSale,
};
