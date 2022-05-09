const serializeSales = ({ sale_id: saleId, product_id: productId, quantity, date }) => {
  const sales = {
    saleId,
    date,
    productId,
    quantity,
  };

  return sales;
};

const serializeSale = ({ product_id: productId, quantity, date }) => {
  const sale = {
    date,
    productId,
    quantity,
  };

  return sale;
};

module.exports = {
  serializeSale,
  serializeSales,
};
