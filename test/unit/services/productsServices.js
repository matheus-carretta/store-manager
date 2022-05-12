const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Ao executar o getAll da service', () => {
  const payloadProduct = [{
		"id": 1,
		"name": "Martelo de Thor",
		"quantity": 10
	}];

  before(async () => {
    sinon.stub(productsModel, 'getAll').resolves(payloadProduct);
  });

  after(async () => {
    productsModel.getAll.restore();
  });

    it('retorna um array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.a('array');
    });

    it('o array possui objetos com as propriedades id, name, quantity', async () => {
      const [response] = await productsService.getAll();

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    });

});