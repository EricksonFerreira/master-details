import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor( private resourceService: BaseResourceService<T> ) { }

  ngOnInit(): void {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a, b) => b.id - a.id),
      error => alert('Error ao carregar a lista')
    );
  }

  deleteResource(resource: T) {

    const mustDelete = confirm('Deseja realmente excluir esse item?');
    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(el => el !== resource),
        () => alert('Error ao tentar excluir!')
      );
    }
  }

}
