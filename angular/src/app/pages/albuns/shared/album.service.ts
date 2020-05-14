import { Injectable, Injector } from '@angular/core';
import { Album } from './album.model';
import { Imagem } from './imagem.model';
import { map, catchError} from 'rxjs/operators';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseResourceService<Album> {
  array = [];
  constructor(protected injector: Injector, http: HttpClient) {
    super('http://localhost:8000/api/album', injector, Album.fromJson);
  }

  postFile(nome: string, descricao: string, fileToUpload: File ) {
    const endpoint = 'http://localhost:8000/api/album/';
    const formData: FormData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('image', fileToUpload);
    return this.http.post(endpoint, formData);
  }

  updateFile(id: number, form, fileToUpload: File ) {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    console.log(fileToUpload);
    const endpoint = 'http://localhost:8000/api/album/' + id;
    return this.http.put(endpoint,  {name: form.name, description: form.description , file: formData}).pipe(
      map(() => formData),
      catchError(this.handleError)
      );
  }


}

