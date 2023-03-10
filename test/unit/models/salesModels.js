const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Ao executar o getAll da model', () => {
  const payloadSales = [[
    {
      sale_id: 1,
      product_id: 1,
      quantity: 5,
      id: 1,
      date: '2022-05-10T23:13:55.000Z'
    }]]

  before(async () => {
    sinon.stub(connection, 'execute').resolves(payloadSales);
  })

  after(async () => {
  connection.execute.restore();
  })

  it('retorna um array de vendas', async () => {
    const response = await salesModel.getAll();
    
    expect(response).to.be.a('array')
  })

  it('cada objeto possui a chave sale_id, product_id, quantity, id e date', async () => {
    const [response] = await salesModel.getAll();

    expect(response).to.have.all.keys('sale_id', 'product_id', 'quantity', 'id', 'date');
  })
})

describe('Ao executar o getAll da model', () => {
  const payload = [[{
      sale_id: 1,
      product_id: 1,
      quantity: 5,
      id: 1,
      date: '2022-05-10T23:13:55.000Z'
  }]];
  const id = 1;

  before(async () => {
    sinon.stub(connection, 'execute').resolves(payload);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um array com uma venda e todos os produtos vendidos', async () => {
    const response = await salesModel.getSale(id);

    expect(response).to.be.a('array');
  });

  it('cada objeto possui a chave sale_id, product_id, quantity, id e date', async () => {
    const [response] = await salesModel.getSale(1);

    expect(response).to.have.all.keys('sale_id', 'product_id', 'quantity', 'id', 'date');
  });

});

describe('Ao executar o create da model', () => {
  const payload = [{
    insertId: 1,
  }];

  before(async () => {
    sinon.stub(connection, 'execute').resolves(payload);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna o id da nova venda', async () => {
    const response = await salesModel.create();

    expect(response).to.be.equals(1);
  });

});

describe('Ao executar o createSalePerProduct da model', () => {
  const payload = [{
    affectedRows: 1,
  }];

  const id = 1;
  const fakeSale = [
    {
      "productId": 1,
      "quantity": 2
    }];

  before(async () => {
    sinon.stub(connection, 'execute').resolves(payload);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Retorna um objeto', async () => {
    const response = await salesModel.createSalePerProduct(id, fakeSale);

    expect(response).to.be.a('object');
  });

  it('Que possui a chave affectedRows', async () => {
    const response = await salesModel.createSalePerProduct(id, fakeSale);

    expect(response).to.be.key('affectedRows');
  });

});