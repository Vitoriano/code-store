import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProducAdmFacade from "./product-adm-facade";

describe('Product-adm Facade Test', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true},
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach( async () => {
    await sequelize.close();
  })

  it("Should create a product", async() => {

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Description",
      purchasePrice: 10,
      stock: 10
    }

    await productFacade.addProduct(input);

    const productDb = await ProductModel.findOne({
      where: { id: input.id},
    })

    expect(productDb.id).toEqual(input.id);
    expect(productDb.name).toEqual(input.name);
    expect(productDb.purchasePrice).toEqual(input.purchasePrice);
    expect(productDb.description).toEqual(input.description);
  });

  it("Should check  product stock", async() => {

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Description",
      purchasePrice: 10,
      stock: 10
    }

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: input.id});

    expect(result.productId).toEqual(input.id);
    expect(result.stock).toEqual(input.stock);
   
  });



});