import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Route, Router } from '@angular/router';

import { Category } from "../shared/category.model";
import { CategoryService} from "../shared/category.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked  {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  // Métodos privados

  //Verifica se é a pagina de editar ou de nova categoria
  private setCurrentAction(){ 
    if(this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new";
    }else{
      this.currentAction = "edit";
    }
  }

  //Deixa os campos do formulário vazios
  private buildCategoryForm(){ 
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  //Caso o formulário seja de edição, preenche os dados do mesmo com os dados da categoria
  private loadCategory(){
    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category); // O patchValue preeche o formulario de Editar Formulário    
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      )
    }
  }

  // Prevenção de mostrar o null no titulo da categoria quando a pagina demorar para carregar
  private setPageTitle(){
    if(this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria";
    }else{
      const categoryName = this.category.name || "";
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }
}
