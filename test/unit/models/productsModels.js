const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection')

describe('Quando busca todos os produtos', () => {
  const payloadProduct = [[{
		"id": 1,
		"name": "Martelo de Thor",
		"quantity": 10
	}]];

  before(async () => {
    const execute = payloadProduct;

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

    it('retorna um array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
    });

    it('o array possui um objeto com id, name, quantity', async () => {
      const [response] = await productsModel.getAll();

      expect(response).to.deep.equals({
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      });
    });

});