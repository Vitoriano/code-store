import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true},
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach( async () => {
    await sequelize.close();
  })

  it("Should find a client", async () => {
  
    const client = await ClientModel.create({
      id: "1",
      name: " Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();

    const result = await repository.find(client.id);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createAt).toEqual(client.createdAt);
    expect(result.updateAt).toEqual(client.updatedAt);

  });

  it("Should create a client", async () => {

    const client = new Client({
      id: new Id("1"),
      name: " Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1"}});

    expect(clientDb.id).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.address).toBe(client.address);
    expect(clientDb.createdAt).toEqual(client.createAt);
    expect(clientDb.updatedAt).toEqual(client.updateAt);

  });

})