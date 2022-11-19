import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  name: " Client 1",
  email: "x@x.com",
  address: "Address 1"
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
  }
}

describe("Find Client Module UseCase Unit Test", () => {

  it("Should find a client", async() => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);
  
    const input = {
      id: '1'
    }

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
  });

});