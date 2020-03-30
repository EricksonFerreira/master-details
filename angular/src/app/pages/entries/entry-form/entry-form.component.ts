import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Route, Router } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { switchMap, map } from 'rxjs/operators';

import toastr from 'toastr';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked  {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry;
  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }
  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }

  // Métodos privados

  // Verifica se é a pagina de editar ou de nova categoria
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  // Deixa os campos do formulário vazios
  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      paid: [true, Validators.required],
      categoryId: [null, Validators.required],
    });
  }

  // Caso o formulário seja de edição, preenche os dados do mesmo com os dados da categoria
  private loadEntry() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      )
      .subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry); // O patchValue preeche o formulario de Editar Formulário
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      );
    }
  }
  private loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  // Prevenção de mostrar o null no titulo da categoria quando a pagina demorar para carregar
  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editando Categoria: ' + entryName;
    }
  }

  private createEntry() {
    const entry: Entry = Entry.fromJson(this.entryForm.value);
    this.entryService.create(entry)
    .subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private updateEntry(){
    const entry: Entry = Entry.fromJson(this.entryForm.value);
    this.entryService.update(entry)
    .subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(entry: Entry){
    toastr.success('Solicitação processada com sucesso!');

    // redireciona e recarrega a pagina do component
    this.router.navigateByUrl('entry', {skipLocationChange:true}).then(
      () => this.router.navigate(['entry', entry.id, 'edit'])
    );
  }

  private actionsForError(error){
    toastr.error('Ocoorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if ( error.status == 422 ) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
      // Vai retornar neste estilo: ['Nome já existe', 'Descrição está invalida']
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o sevidor. Por favor, tente mais tarde.']
    }
  }
}
