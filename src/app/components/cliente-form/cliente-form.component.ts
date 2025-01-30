import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente';
import { HttpErrorResponse } from '@angular/common/http';


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

  static readonly PATRON_SOLO_LETRAS = /^[a-zA-Z ]*$/;
  static readonly PATRON_TELEFONO = /^\+?(\d{1,3})?\s?\d{7,15}$/;
  static readonly PATRON_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  cliente: Cliente = new Cliente();
  errorsNombre: string[] = [];
  errorsApellido: string[] = [];
  errorsTelefono: string[] = [];
  errorsEmail: string[] = [];
  errorGeneral: string[] = [];
  hasError: boolean = true;

  constructor(private clienteService: ClienteService) {}

  formatoNombreOrApellido(campo: string, errores: string[], etiqueta: string, maxLength: number): void {
    errores.length = 0; // Resetea los errores
    this.hasError = false;
    this.isformatoLetras(campo, errores, etiqueta);
    this.isLongitud(campo, errores, maxLength, etiqueta);
    this.isVacio(campo, errores, etiqueta);
  }

  formatoTelefono(campo: string, errores:string[], etiqueta:string, maxLength : number): void {
    errores.length = 0;
    this.hasError = false;
    this.isVacio(campo, errores, etiqueta)
    this.isLongitud(campo, errores, maxLength, etiqueta);
    this.isformatoTelefono(campo, errores, etiqueta);
  }


  formatoEmail(campo: string, errores:string[], etiqueta:string, maxLength : number): void {
    errores.length = 0;
    this.hasError = false;
    this.isVacio(campo, errores, etiqueta)
    this.isLongitud(campo, errores, maxLength, etiqueta);
    this.isformatoEmail(campo, errores, etiqueta);
  }
  

  validarNombre(event: KeyboardEvent): void {
    this.formatoNombreOrApellido(this.cliente.nombre, this.errorsNombre, 'nombre', 45);
  }

  validarApellido(event: KeyboardEvent): void {
    this.formatoNombreOrApellido(this.cliente.apellido, this.errorsApellido, 'apellido', 45);
  }

  validarTelefono(event: KeyboardEvent): void {
    this.formatoTelefono(this.cliente.telefono, this.errorsTelefono, 'telefono', 15);
  }

  validarEmail(event: KeyboardEvent): void {
    this.formatoTelefono(this.cliente.email, this.errorsEmail, 'email', 45);
  }
  guardarCliente(): void {
    this.formatoNombreOrApellido(this.cliente.nombre, this.errorsNombre, 'nombre', 45);
    this.formatoNombreOrApellido(this.cliente.apellido, this.errorsApellido, 'apellido', 45);
    this.formatoTelefono(this.cliente.telefono, this.errorsTelefono, 'telefono', 15);
    if (this.hasError) return;
    this.enviarCliente()
  }

  enviarCliente(): void {
    this.clienteService.crearCliente(this.cliente).subscribe(
      (response: Cliente) => { 
        console.log('Cliente creado:', response);
      },
      (error: any) => { 
        this.errorGeneral = this.processErrorResponse(error);
      }
    );
  }
  

  processErrorResponse(error: HttpErrorResponse): string[] {
    let errorMessages: string[] = [];
    if (error.error) {
      for (let key in error.error) {
        if (error.error[key]) {
          errorMessages.push(`${key}: ${error.error[key].join(', ')}`);
        }
      }
    }
    return errorMessages;
  }

  reset(): void { 
    this.cliente.nombre = '';
    this.cliente.apellido = '';
    this.cliente.telefono = '';
    this.errorsNombre = [];
    this.errorsApellido = [];
    this.errorsTelefono = [];
    this.errorGeneral = [];  
    this.hasError = true;
  }
 

  private isformatoLetras(campo : string, errores: string[], etiqueta: string): void {
    if (!ClienteFormComponent.PATRON_SOLO_LETRAS.test(campo)) {
      errores.push(`El ${etiqueta} solo puede contener letras y espacios.`);
      this.hasError = true;
    }
  }

  private isformatoEmail(campo : string, errores: string[], etiqueta: string): void {
    if (!ClienteFormComponent.PATRON_EMAIL.test(campo)) {
      errores.push(`El ${etiqueta} es incorrecto.`);
      this.hasError = true;
    }
  }

  private isformatoTelefono(campo : string, errores: string[], etiqueta: string): void {
    if (!ClienteFormComponent.PATRON_TELEFONO.test(campo)) {
      errores.push(`El ${etiqueta} es inválido.`);
      this.hasError = true;
    }
  }



  private isLongitud(campo: string, errores: string[], maxLength: number, etiqueta: string): void {
    if (campo.length > maxLength) {
      errores.push(`El ${etiqueta} no puede tener más de ${maxLength} caracteres.`);
      this.hasError = true;
    }
  }

  private isVacio(campo: string, errores: string[], etiqueta: string): void {
    try {
      if (campo.length === 0) {
        errores.push(`El ${etiqueta} no puede estar vacío.`);
        this.hasError = true;
      }
    } catch (error) {
      errores.push('Hubo un error al validar el teléfono.');
    }
  }

  private isEmail(campo: string, errores: string[]): void {

  }
}
