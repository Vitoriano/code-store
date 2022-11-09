import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogoFacadeOutputDto, FindStoreCatalogoFacadeInputDto, FindStoreCatalogoFacadeOutputDto } from "./store-catalog.facade.interface";


export interface UseCaseProps {
  findUseCase: FindProductUsecase;
  findAllUseCase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  
  private _findUseCase: FindProductUsecase;
  private _findAllUseCase: FindAllProductsUsecase;

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase;
    this._findAllUseCase = props.findAllUseCase;
  }

  async find(id: FindStoreCatalogoFacadeInputDto): Promise<FindStoreCatalogoFacadeOutputDto> {
    return await this._findUseCase.execute(id);
  }

  async  findAll(): Promise<FindAllStoreCatalogoFacadeOutputDto> {
    return await this._findAllUseCase.execute();
  }

}