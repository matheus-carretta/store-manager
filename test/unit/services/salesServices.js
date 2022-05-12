const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesServices');

describe('Ao executar o getAll de service', () => { 
  const payloadSales = [
    {
      saleId: 1,
      date: '2022-05-10T23:13:55.000Z',
      productId: 1,
      quantity: 5
    }]

    before(async () => {
      sinon.stub(salesModel, 'getAll').resolves(payloadSales);
    })

    after(async () => {
      salesModel.getAll.restore();
    })
    
  it('retorna um array de sales', async () => {
    const response = await salesService.getAll();
    
    expect(response).to.be.a('array');
  })

  it('cada objeto possui a chave saleId, date, productId e quantity ', async () => {
    const [response] = await salesModel.getAll();

    expect(response).to.have.all.keys('saleId', 'productId', 'quantity', 'date');
  })
});