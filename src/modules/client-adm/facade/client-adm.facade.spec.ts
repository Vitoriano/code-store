import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("Facade Client-ADM unit test", () => {

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

  it("Should create a client", async () => {

    const repository = new ClientRepository();
    const addUsecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: undefined
    })


    const client = {
      id: "1",
      name: " Client 1",
      email: "x@x.com",
      address: "Address 1"
    };

    await facade.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1"}});

    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.address).toBe(client.address);

  });

  it("Should find a client", async () => {

    const facade = ClientAdmFacadeFactory.create();

    const client = {
      id: "1",
      name: " Client 1",
      email: "x@x.com",
      address: "Address 1"
    };

    await facade.add(client);

    const clientDb = await facade.find({ id: "1"});

    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.address).toBe(client.address);

  });


  

})