const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { response } = require('express');

describe('Ao executar o getAll da controller', () => {
  const req = {};
  const res = {};
  const payloadProduct = [{
		"id": 1,
		"name": "Martelo de Thor",
		"quantity": 10
	}];

  before(async () => {
    res.status = sinon.stub()
    .returns(res);

    res.json = sinon.stub()
    .returns(payloadProduct);

    sinon.stub(productsService, 'getAll').resolves(payloadProduct);
  });

  after(async () => {
    productsService.getAll.restore();
  });

    it('retorna um array de objetos com os produtos', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(payloadProduct)).to.be.equal(true);
    });

    it('e retorna o status 200', async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    })

});

describe('Ao executar o getProduct da controller', () => {
  describe('e consegue encontrar um produto' , () => {
    const req = {};
    const res = {};
    const payload = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };
  
    before(async () => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
  
      res.json = sinon.stub().returns();
  
      sinon.stub(productsService, 'getProduct').resolves(payload);
    });
  
    after(async () => {
      productsService.getProduct.restore();
    });
  
      it('retorna apenas um objeto', async () => {
        await productsController.getProduct(req, res);
  
        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
  
      it('e retorna o status 200', async () => {
        await productsController.getProduct(req, res);
  
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
  });

});