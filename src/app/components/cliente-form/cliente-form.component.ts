import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule // Asegúrate de que esto está incluido
  ],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'] // Corregido a "styleUrls"
})
export class ClienteFormComponent {
  static readonly ERROR_SOLO_LETRAS = 'Solo se aceptan letras';
  static readonly ERROR_LONGITUD = 'El término de búsqueda no puede ser más de 6 caracteres';
  static readonly ERROR_VACIO = 'El término está vacío';
  static readonly PATRON_SOLO_LETRAS = /^[a-zA-Z ]*$/;

  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  errorsNombre: string[] = [];
  hasError: boolean = true;

  validarNombre(event: KeyboardEvent): void {
    this.errorsNombre = []; // Resetea los errores
    this.hasError = false;

    this.validarSoloLetras(this.nombre, this.errorsNombre);
    this.validarLongitud(this.nombre, this.errorsNombre, 45);
    this.validarVacio(this.nombre, this.errorsNombre);
  }

  private validarSoloLetras(term: string, errores: string[]): void {
    if (!ClienteFormComponent.PATRON_SOLO_LETRAS.test(term)) {
      errores.push(ClienteFormComponent.ERROR_SOLO_LETRAS);
      this.hasError = true;
    }
  }

  private validarLongitud(term: string, errores: string[], longitudMaxima: number): void {
    if (term.length > longitudMaxima) {
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
}
