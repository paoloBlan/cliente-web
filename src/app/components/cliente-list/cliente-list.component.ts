import { Component } from '@angular/core';
import { ClienteSearchComponent } from '../cliente-search/cliente-search.component';

@Component({
  selector: 'app-cliente-list',
  imports: [
    ClienteSearchComponent,
  
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export  class ClienteListComponent {

}
