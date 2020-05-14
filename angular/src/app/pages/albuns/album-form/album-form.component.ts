import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

import { Album } from '../shared/album.model';
import { AlbumService } from '../shared/album.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})

export class AlbumFormComponent extends BaseResourceFormComponent<Album> {

  fileToUpload = null;
  imageUrl = null;
  file = null;
  imagesUrls = [];
  urls = [];
  url = null;
  imageService = null;
  idUpdate = null;

  constructor(
    protected albumService: AlbumService,
    protected injector: Injector,
  ) {
    super(injector, new Album(), albumService, Album.fromJson);
   }

  // Deixa os campos do formulário vazios
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      imagem: [null],
      description: [null]
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Álbum';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return 'Editando Álbum: ' + resourceName;
  }

  onFileSelected(file) {
    this.fileToUpload = (file.target as HTMLInputElement).files[0];
    // show image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url = e.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  OnSubmit(Nome, Descricao, Image) {
    this.idUpdate = this.route.snapshot.url[0].path;
    // Verifica se é adicionar ou editar
    if (this.route.snapshot.url[0].path === 'new') {
      this.albumService.postFile(Nome, Descricao, this.fileToUpload).subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );
    } else {
      this.albumService.updateFile(this.idUpdate, this.resourceForm.value, this.fileToUpload).subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      );

    }
  }
}

