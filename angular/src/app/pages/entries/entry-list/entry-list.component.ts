import { Component, OnInit } from '@angular/core';

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a,b) => b.id - a.id),
      error => alert('Error ao carregar a lista')
    )
  }

  deleteEntry(entry){

    const mustDelete = confirm("Deseja realmente excluir esse item?");
    if(mustDelete){
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(el => el != entry),
        () => alert("Error ao tentar excluir!")
      )
    }
  }

}
