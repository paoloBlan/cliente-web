export class Cliente {
    id?: number;
    nombre: string;
    apellido: string;
    telefono: string;

    constructor(nombre: string = '', apellido: string = '', telefono: string = '') {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
    }
}
