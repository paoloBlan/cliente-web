import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  imports: [
    RouterModule
    
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent {
  static readonly ERROR_SOLO_LETRAS = 'Solo se aceptan letras';
    static readonly ERROR_LONGITUD = 'El término de búsqueda no puede ser más de 6 caracteres';
    static readonly ERROR_VACIO = 'El término está vacío';
    static readonly PATRON_SOLO_LETRAS = /^[a-zA-Z ]*$/;

    searchTerm: string = '';
    errors: string[] = [];
    hasError: boolean = true; 

   

    buscar(event: KeyboardEvent): void {
      this.errors = this.validar(this.searchTerm);
  
      if (this.errors.length > 0) {
        return;
      }

      if (event.key === 'Enter') {
        //this.holaMundo();
      }
  
    }

    private validar(term: string): string[] {
      const errores: string[] = [];
      this.hasError = false;
      this.validarSoloLetras(term, errores);
      this.validarLongitud(term, errores);
      this.validarVacio(term, errores);
      return errores;
    }
    
    private validarSoloLetras(term: string, errores: string[]): void {
      if (!ClienteFormComponent.PATRON_SOLO_LETRAS.test(term)) {
        errores.push(ClienteFormComponent.ERROR_SOLO_LETRAS);
        this.hasError = true;
      }
    }
  
    private validarLongitud(term: string, errores: string[]): void {
      if (term.length > 6) {
        errores.push(ClienteFormComponent.ERROR_LONGITUD);
        this.hasError = true;
      }
    }
  
    private validarVacio(term: string, errores: string[]): void {
      if (term.trim() === '') {
        errores.push(ClienteFormComponent.ERROR_VACIO);
        this.hasError = true;
      }
    }

   

  onSubmit() {
    console.log('Formulario enviado')
  }
}
