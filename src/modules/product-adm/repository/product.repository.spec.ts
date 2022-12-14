import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

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

    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: " Description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id},
    })

    expect(productProps.id.id).toEqual(productDb.id);
    expect(productProps.name).toEqual(productDb.name);
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
    expect(productProps.description).toEqual(productDb.description);

  });

  it("Should find a product", async () => {

    const productRepository = new ProductRepository();

    const product = new Product(
      {
        id: new Id("1"),
        name: "Product 1",
        description: "Description",
        purchasePrice: 100,
        stock: 10,
        createAt: new Date(),
        updateAt: new Date()
      }
    );
    
    await productRepository.add(product);

    const productFind = await productRepository.find("1");

    expect(productFind.id.id).toEqual("1");
    expect(productFind.name).toEqual("Product 1");
    expect(productFind.description).toEqual("Description");

  });

});