import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
}

describe("Add Product usecase unit test", () => {

  it("Shoud add a product", async () => {

    const productRepository = MockRepository();
    const usecase = new AddProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      description: "Description",
      purchasePrice: 100,
      stock: 10,
    }

    const result = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBeDefined;
    expect(result.description).toBeDefined;

  });


});