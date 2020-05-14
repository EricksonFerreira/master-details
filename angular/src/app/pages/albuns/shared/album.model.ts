import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Album extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string
    ) {
      super();
    }
    static fromJson(jsonData: any): Album {
      return Object.assign(new Album(), jsonData);
    }

}

