import { OnInit, AfterContentChecked, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Route, Router } from '@angular/router';


import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked  {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    public jsonDataToResourceFn: (jsonData) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  // Métodos protegidos

  // Verifica se é a pagina de editar ou de nova categoria
  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  // Caso o formulário seja de edição, preenche os dados do mesmo com os dados da categoria
  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource); // O patchValue preeche o formulario de Editar Formulário
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      );
    }
  }

  // Prevenção de mostrar o null no titulo da categoria quando a pagina demorar para carregar
  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle() {
      return 'Novo';

    }
  protected editionPageTitle() {
      return 'Edição';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    console.log(resource);
    this.resourceService.update(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource: T) {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redireciona e recarrega a pagina do component
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    );
  }

  protected actionsForError(error) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if ( error.status === 422 ) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
      // Vai retornar neste estilo: ['Nome já existe', 'Descrição está invalida']
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o sevidor. Por favor, tente mais tarde.'];
    }
  }

  protected abstract buildResourceForm(): void;
}
