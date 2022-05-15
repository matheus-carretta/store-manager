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