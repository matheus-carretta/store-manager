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

describe("Ao usar o getProduct da services", () => {
  describe('e não encontra um produto', () => {
    const payload = undefined;
    const id = 10;

    before(async () => {
      sinon.stub(productsModel, 'getProduct').resolves(payload);
    });

    after(async () => {
      productsModel.getProduct.restore();
    })

    it('retorna um erro 404 com a messagem "Product not found"', async() => {
      try {
        await productsService.getProduct(id)
      } catch(error) {
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('Product not found');
      };
    });

  });

  describe('quando encontra um produto', () => {
    const id = 1;
    const payload = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };

    before(async () => {
      sinon.stub(productsModel, 'getProduct').resolves(payload);
    })

    after(async () => {
      productsModel.getProduct.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productsService.getProduct(id);

      expect(response).to.be.a('object');
    })

    it('o objeto possui as chaves id, name e quantity', async () => {
      const response = await productsService.getProduct(id);

      expect(response).to.have.all.keys('id', 'name', 'quantity');
    })

  })
})