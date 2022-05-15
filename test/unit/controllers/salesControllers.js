const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesServices');

describe('Ao executar o getAll da controller', () => { 
  const req = {};
  const res = {};
  const payloadSales = [{
    saleId: 1,
    date: '2022-05-10T23:13:55.000Z',
    productId: 1,
    quantity: 5
  }];

  before(async () => {
    res.status = sinon.stub()
    .returns(res);

    res.json = sinon.stub()
    .returns(payloadSales);

    sinon.stub(salesService, 'getAll').resolves(payloadSales);
  });

  after(async () => {
    salesService.getAll.restore();
  });

    it('retorna um array de objetos com as vendas', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(payloadSales)).to.be.equal(true);
    });

    it('e retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
});

describe('Ao executar o getSale da controller', () => {
  const req = {};
  const res = {};
  const payloadSales = [{
    saleId: 1,
    date: '2022-05-10T23:13:55.000Z',
    productId: 1,
    quantity: 5
  }];

  before(async () => {
    res.status = sinon.stub()
    .returns(res);

    res.json = sinon.stub()
    .returns(payloadSales);

    sinon.stub(salesService, 'getAll').resolves(payloadSales);
  });

  after(async () => {
    salesService.getAll.restore();
  });

    it('retorna um array de objetos com as vendas', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(payloadSales)).to.be.equal(true);
    });

    it('e retorna o status 200', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
});