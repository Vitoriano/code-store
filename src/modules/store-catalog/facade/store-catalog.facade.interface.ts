
export interface FindStoreCatalogoFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogoFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogoFacadeOutputDto {
  products : {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[]
}

export default interface StoreCatalogFacadeInterface {
  find(id: FindStoreCatalogoFacadeInputDto): Promise<FindStoreCatalogoFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogoFacadeOutputDto>;
}