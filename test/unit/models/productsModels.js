const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Ao executar o getAll da model', () => {
  const payloadProduct = [[{
		"id": 1,
		"name": "Martelo de Thor",
		"quantity": 10
	}]];

  before(async () => {
    sinon.stub(connection, 'execute').resolves(payloadProduct);
  });

  after(async () => {
    connection.execute.restore();
  });

    it('retorna um array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a('array');
    });

    it('o array possui objetos com as propriedades id, name, quantity', async () => {
      const [response] = await productsModel.getAll();

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    });

});

describe("Ao usar o getProduct da model", () => {
  describe('e não encontra um produto', () => {
    const payload = [[[]]];
    const id = 10;

    before(async () => {
      sinon.stub(connection, 'execute').resolves(payload);
    });

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const response = await productsModel.getProduct(id);

      expect(response).to.be.a('array');
    })

    it('e esse array está vazio', async () => {
      const response = await productsModel.getProduct(id);

      expect(response).to.be.empty;
    })
  })

  describe('quando encontra um produto', () => {
    const id = 1;
    const payload = [[{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(payload);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productsModel.getProduct(id);

      expect(response).to.be.a('object');
    })

    it('o objeto possui as chaves id, name e quantity', async () => {
      const response = await productsModel.getProduct(id);

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    })

  })
})