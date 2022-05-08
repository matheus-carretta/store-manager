const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');

  return products;
};

const getProduct = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id=?;', [id]);

  return product[0];
};

module.exports = {
  getAll,
  getProduct,
};
