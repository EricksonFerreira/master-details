import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Imagem extends BaseResourceModel {
  constructor(
      public id?: number,
      public name?: string,
      public AlbumId?: number
  ) {
    super();
  }
  static fromJson(jsonData: any): Imagem {
    return Object.assign(new Imagem(), jsonData);
  }

}
