import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-cliente-search',
  imports: [
    FormsModule,
  ],
  templateUrl: './cliente-search.component.html',
  styleUrl: './cliente-search.component.css'
})
  export class ClienteSearchComponent {
    searchTerm: string = '';
    error:String= '';
    
    buscar(): void {
      // validar searchTerm que solo acepte letras
      if(!this.searchTerm.match(/^[a-zA-Z ]*$/)) {
        this.error = 'Solo se aceptan letras';
        
        return;
      }

      if(this.searchTerm.length > 6) { 
        this.error = 'El término de búsqueda no puede ser más de 6 caracteres';
        return;
      }
      this.error = '';
      console.log(`Buscando por: ${this.searchTerm}`);
    }
  }
