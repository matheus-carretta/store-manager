const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');

  return products;
};

const getProduct = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id=?;', [id]);

  return product[0];
};

const create = async (name, quantity) => {
  const [newProduct] = await connection.execute(`
    INSERT INTO products (name, quantity) VALUES (?, ?);
  `, [name, quantity]);

  return newProduct.insertId;
};

const update = async ({ id, name, quantity }) => {
  const [updatedProduct] = await connection.execute(`
    UPDATE products
    SET name=?, quantity=?
    WHERE id=?
  `, [name, quantity, id]);

  return updatedProduct;
};

const remove = async (id) => {
  const deletedProduct = await connection.execute(`
    DELETE FROM products
    WHERE id=?
  `, [id]);

  return deletedProduct;
};

const findByName = async (name) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE name=?;', [name]);

  return product[0];
};

const decreaseStock = async (productId, quantity) => {
  const [updatedProduct] = await connection.execute(`
    UPDATE products
    SET quantity= quantity - ?
    WHERE id=?
  `, [quantity, productId]);

  return updatedProduct;
};

const increaseStock = async (productId, quantity) => {
  const [updatedProduct] = await connection.execute(`
    UPDATE products
    SET quantity= quantity + ?
    WHERE id=?
  `, [quantity, productId]);

  return updatedProduct;
};

module.exports = {
  getAll,
  getProduct,
  create,
  findByName,
  update,
  remove,
  decreaseStock,
  increaseStock,
};
